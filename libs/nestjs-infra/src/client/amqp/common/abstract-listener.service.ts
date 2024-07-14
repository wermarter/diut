import { Logger, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common'
import { ConfirmChannel, ConsumeMessage, Options } from 'amqplib'
import { setTimeout } from 'timers/promises'
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus'

import { IConsumable } from './interface'

export abstract class AbstractListenerService<TPayload>
  extends HealthIndicator
  implements OnApplicationBootstrap, OnModuleDestroy
{
  protected readonly logger: Logger
  private abortController = new AbortController()
  private runningCount = 0
  private isChannelClosed = false

  constructor(
    private readonly consumable: IConsumable<TPayload>,
    private readonly options?: Options.Consume,
    private readonly routingKeys?: string[],
  ) {
    super()
    this.logger = new Logger(this.constructor.name)
  }

  public healthcheck() {
    if (!this.isChannelClosed) {
      return this.getStatus(this.constructor.name, true)
    }

    throw new HealthCheckError(
      'down',
      this.getStatus(this.constructor.name, false, {
        message: 'channel is closed',
      }),
    )
  }

  async onModuleDestroy() {
    if (this.isChannelClosed) {
      return
    }

    await this.consumable.cancel()
    this.abortController.abort()

    do {
      this.logger.verbose('waiting handle()...')
      await setTimeout(1000)
    } while (this.runningCount !== 0)
  }

  async onApplicationBootstrap() {
    const abortSignal = this.abortController.signal

    await this.consumable.consume(
      async (payload, channel, message) => {
        this.runningCount++
        // this.logger.verbose(`start: ${message.fields.deliveryTag}`)
        await this.handle(payload, abortSignal, channel, message)
        // this.logger.verbose(`done: ${message.fields.deliveryTag}`)
      },
      this.options,
      () => {
        this.runningCount--
      },
      () => {
        this.isChannelClosed = true
      },
      this.routingKeys,
    )
  }

  abstract handle(
    payload: TPayload,
    signal: AbortSignal,
    channel: ConfirmChannel,
    message: ConsumeMessage,
  ): void | Promise<void>
}
