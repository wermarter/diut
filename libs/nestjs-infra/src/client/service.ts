import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { RetryOptions, retry } from 'async'

export const DEFAULT_CLIENT_CONNECTION_ID = 'default'

export abstract class AbstractClientService
  implements OnModuleInit, OnModuleDestroy
{
  protected logger: Logger
  private retryOptions: RetryOptions<unknown>
  private ignoreConnectFail: boolean

  constructor(clientConfig: {
    name: string
    connectionId?: string
    retryOptions?: RetryOptions<unknown>
    ignoreConnectFail?: boolean
  }) {
    const connectionId =
      clientConfig.connectionId ?? DEFAULT_CLIENT_CONNECTION_ID
    this.retryOptions = clientConfig.retryOptions ?? {
      times: 3,
      interval: 1000,
    }
    this.ignoreConnectFail = clientConfig.ignoreConnectFail ?? false
    this.logger = new Logger(`${clientConfig.name}:${connectionId}`)
  }

  async onModuleInit() {
    this.logger.verbose('Connecting...')
    let isSuccessful = true
    try {
      await retry(
        {
          ...this.retryOptions,
          errorFilter: (error) => {
            this.logger.warn(`Connect failed:${error}`)
            return this.retryOptions?.errorFilter?.(error) ?? true
          },
        },
        async () => {
          await this.connect()
        },
      )
    } catch (e) {
      this.logger.error({ message: `Cannot connect`, error: e, stack: e.stack })
      isSuccessful = false
      if (!this.ignoreConnectFail) {
        throw e
      }
    }
    isSuccessful && this.logger.verbose('Connected!')
  }

  async onModuleDestroy() {
    this.logger.verbose('Closing...')
    try {
      await retry(
        {
          ...this.retryOptions,
          errorFilter: (error) => {
            this.logger.warn(`Close failed:${error}`)
            return this.retryOptions?.errorFilter?.(error) ?? true
          },
        },
        async () => {
          await this.close()
        },
      )
    } catch (e) {
      this.logger.error(`Cannot close:${e}`)
    }
    this.logger.verbose('Closed!')
  }

  async safeReadyCheck() {
    try {
      await this.readyCheck()
      return true
    } catch (e) {
      this.logger.error(`Ready check failed:${e}`)
      return false
    }
  }

  abstract connect(): void | Promise<void>
  abstract close(): void | Promise<void>
  abstract readyCheck(): void | Promise<void>
}
