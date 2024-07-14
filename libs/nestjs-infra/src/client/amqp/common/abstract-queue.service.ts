import { BeforeApplicationShutdown, Logger, OnModuleInit } from '@nestjs/common'
import { Options, ConsumeMessage, ConfirmChannel } from 'amqplib'
import { inspect } from 'util'
import { hostname } from 'os'

import { AmqpClientService } from '../service'
import { IConsumable, NackMessage } from './interface'

export abstract class AbstractQueueService<TPayload = unknown>
  implements IConsumable<TPayload>, OnModuleInit, BeforeApplicationShutdown
{
  protected logger: Logger
  protected channel: ConfirmChannel
  private readonly consumerTag: string

  constructor(
    private readonly amqpService: AmqpClientService,
    public readonly name: string,
    public readonly options?: Options.AssertQueue & {
      prefetch: number
    },
  ) {
    this.logger = new Logger(`Queue:${name}`)
    this.consumerTag = `${name}:${hostname()}:${Math.random()}`
  }

  async onModuleInit() {
    this.logger.log('Connecting...')
    try {
      this.channel = await this.amqpService.client.createConfirmChannel()
      await this.channel.assertQueue(this.name, this.options)
      if (this.options?.prefetch) {
        await this.channel.prefetch(this.options.prefetch)
      }
      this.logger.log('Connected')
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  async beforeApplicationShutdown() {
    try {
      await this.channel.waitForConfirms()
      await this.channel.close()
    } catch (e) {
      this.logger.error(e)
    }
  }

  async publish(payload: TPayload, options?: Options.Publish) {
    const isBufferFull = !this.channel.sendToQueue(
      this.name,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true, ...options },
    )

    if (isBufferFull) {
      await new Promise<boolean>((resolve) =>
        this.channel.once('drain', () => resolve(true)),
      )
    }
  }

  async cancel() {
    await this.channel.cancel(this.consumerTag)
  }

  async consume(
    callback: (
      payload: TPayload,
      channel: ConfirmChannel,
      message: ConsumeMessage,
    ) => void | Promise<void>,
    options?: Options.Consume,
    finallyHook?: () => void | Promise<void>,
    onChannelClose?: Function,
  ) {
    if (onChannelClose) {
      this.channel.once('close', () => {
        onChannelClose()
      })
    }

    await this.channel.consume(
      this.name,
      async (message) => {
        if (message !== null) {
          const stringContent = message.content.toString()

          try {
            const payload = JSON.parse(stringContent)
            await callback(payload, this.channel, message)

            this.channel.ack(message)
          } catch (e) {
            if (!(e instanceof NackMessage)) {
              this.logger.error(
                `Failed to process message: ${stringContent}\n${inspect(e)}`,
              )
            }
            this.channel.nack(message)
          } finally {
            if (finallyHook) {
              await finallyHook()
            }
          }
        } else {
          this.logger.warn('message === null')
        }
      },
      { ...options, noAck: false, consumerTag: this.consumerTag },
    )
  }
}
