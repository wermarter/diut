import { Logger, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus'
import { RetryOptions, retry } from 'async'

export const DEFAULT_CLIENT_INSTANCE_ID = 'default'

export abstract class AbstractService
  extends HealthIndicator
  implements OnModuleInit, OnApplicationShutdown
{
  protected logger: Logger
  private retryOptions: RetryOptions<unknown>
  private ignoreConnectFail: boolean

  constructor(clientConfig: {
    name?: string
    instanceId?: string
    retryOptions?: RetryOptions<unknown>
    ignoreConnectFail?: boolean
  }) {
    super()

    const instanceId = clientConfig.instanceId ?? DEFAULT_CLIENT_INSTANCE_ID
    this.retryOptions = clientConfig.retryOptions ?? {
      times: 3,
      interval: 1000,
    }
    this.ignoreConnectFail = clientConfig.ignoreConnectFail ?? false
    this.logger = new Logger(
      `${clientConfig.name ?? this.constructor.name}:${instanceId}`,
    )
  }

  async onModuleInit() {
    this.logger.verbose('Connecting...')
    let isSuccessful = true
    try {
      await retry(
        {
          ...this.retryOptions,
          errorFilter: (error) => {
            this.logger.warn(`Connect failed: ${error}`)
            return this.retryOptions?.errorFilter?.(error) ?? true
          },
        },
        async () => {
          await this.connect()
        },
      )
      await this.readyCheck()
    } catch (e) {
      Error.captureStackTrace(e)
      this.logger.error({ message: `Cannot connect`, error: e, stack: e.stack })
      isSuccessful = false
      if (!this.ignoreConnectFail) {
        throw e
      }
    }
    isSuccessful && this.logger.verbose('Connected!')
  }

  async onApplicationShutdown() {
    this.logger.verbose('Closing...')
    try {
      await retry(
        {
          ...this.retryOptions,
          errorFilter: (error) => {
            this.logger.warn(`Close failed: ${error}`)
            return this.retryOptions?.errorFilter?.(error) ?? true
          },
        },
        async () => {
          await this.close()
        },
      )
    } catch (e) {
      this.logger.error(`Cannot close: ${e}`)
    }
    this.logger.verbose('Closed!')
  }

  async healthcheck() {
    try {
      await this.readyCheck()

      return this.getStatus(this.constructor.name, true)
    } catch (e) {
      try {
        // re-connect if possible
        this.logger.warn(`Reconnecting due to healthcheck failure: ${e}`)
        await this.connect()
        await this.readyCheck()

        return this.getStatus(this.constructor.name, true, {
          reconnected: true,
        })
      } catch (reconnectError) {
        throw new HealthCheckError(
          'down',
          this.getStatus(this.constructor.name, false, {
            retryError: reconnectError,
          }),
        )
      }
    }
  }

  abstract connect(): void | Promise<void>
  abstract close(): void | Promise<void>

  /**
   * Throw if error
   */
  abstract readyCheck(): void | Promise<void>
}
