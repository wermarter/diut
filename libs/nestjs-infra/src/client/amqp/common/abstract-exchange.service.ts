import { BeforeApplicationShutdown, Logger, OnModuleInit } from '@nestjs/common'
import { Options, ConsumeMessage, ConfirmChannel } from 'amqplib'
import { inspect } from 'util'
import { hostname } from 'os'

import { AmqpClientService } from '../service'
import { IConsumable, NackMessage } from './interface'
import { AbstractQueueService } from './abstract-queue.service'

type AbstractQueueBinding<TPayload> = {
  routingKey: string
  queue: AbstractQueueService<TPayload>
}
type RawQueueBinding = {
  routingKey: string
  queueName: string
  options?: Options.AssertQueue
}
type QueueBinding<TPayload> = RawQueueBinding | AbstractQueueBinding<TPayload>

function isAbstractQueueBinding<TPayload>(
  binding: QueueBinding<TPayload>,
): binding is AbstractQueueBinding<TPayload> {
  // @ts-ignore
  return binding.queue !== undefined
}

export abstract class AbstractExchangeService<TPayload = unknown>
  implements IConsumable<TPayload>, OnModuleInit, BeforeApplicationShutdown
{
  protected logger: Logger
  protected channel: ConfirmChannel
  private readonly consumerTags: string[] = []
  private readonly consumerTagPrefix: string

  constructor(
    private readonly amqpService: AmqpClientService,
    public readonly name: string,
    public readonly type: 'direct' | 'topic' | 'x-delayed-message',
    protected readonly options?: Options.AssertExchange & {
      prefetch?: number
      exclusiveQueueOptions?: Options.AssertQueue
    },
    private readonly queueBindings?: QueueBinding<TPayload>[],
  ) {
    this.logger = new Logger(`Exchange:${name}`)
    this.consumerTagPrefix = `${name}:${hostname()}:${Math.random()}`
  }

  async onModuleInit() {
    this.logger.log('Connecting...')
    try {
      this.channel = await this.amqpService.client.createConfirmChannel()
      await this.channel.assertExchange(this.name, this.type, this.options)
      if (this.options?.prefetch) {
        // channel-level basic.qos
        await this.channel.prefetch(this.options?.prefetch, true)
      }

      this.logger.log('Connected')
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  async cancel() {
    for (const consumerTag of this.consumerTags) {
      await this.channel.cancel(consumerTag)
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

  async publish(
    routingKey: string,
    payload: TPayload,
    options?: Options.Publish,
  ) {
    const isBufferFull = !this.channel.publish(
      this.name,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true, ...options },
    )

    if (isBufferFull) {
      await new Promise<boolean>((resolve) =>
        this.channel.once('drain', () => resolve(true)),
      )
    }
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
    routingKeys?: string[],
  ) {
    if (routingKeys === undefined) {
      throw new Error('must supply routingKey when consuming exchange')
    }

    if (onChannelClose) {
      this.channel.once('close', () => {
        onChannelClose()
      })
    }

    for (const consumeRoutingKey of routingKeys) {
      const consumerTag = `${this.consumerTagPrefix}:${consumeRoutingKey}`
      this.consumerTags.push(consumerTag)

      let queueName = ''
      const queueBinding = this.queueBindings?.find(
        ({ routingKey }) => routingKey === consumeRoutingKey,
      )

      if (queueBinding) {
        if (isAbstractQueueBinding(queueBinding)) {
          const { queue } = await this.channel.assertQueue(
            queueBinding.queue.name,
            queueBinding.queue.options,
          )
          if (queueBinding.queue.options?.prefetch) {
            await this.channel.prefetch(
              queueBinding.queue.options.prefetch,
              false,
            )
          }
          queueName = queue
        } else {
          const { queue } = await this.channel.assertQueue(
            queueBinding.queueName,
            queueBinding.options,
          )
          queueName = queue
        }
      } else {
        const { queue } = await this.channel.assertQueue('', {
          ...this.options?.exclusiveQueueOptions,
          exclusive: true,
        })
        queueName = queue
      }

      await this.channel.bindQueue(queueName, this.name, consumeRoutingKey)

      await this.channel.consume(
        queueName,
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
        { ...options, noAck: false, consumerTag },
      )
    }
  }
}
