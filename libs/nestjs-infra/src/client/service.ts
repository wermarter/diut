import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { RetryOptions, retry } from 'async'

export const DEFAULT_CLIENT_CONNECTION_ID = 'default'

export abstract class AbstractClientService
  implements OnModuleInit, OnModuleDestroy
{
  protected logger: Logger
  private retryOptions: RetryOptions<unknown>

  constructor(clientConfig: {
    name: string
    connectionId?: string
    retryOptions?: RetryOptions<unknown>
  }) {
    const connectionId =
      clientConfig.connectionId ?? DEFAULT_CLIENT_CONNECTION_ID
    this.retryOptions = clientConfig.retryOptions ?? {
      times: 3,
      interval: 1000,
    }

    this.logger = new Logger(`${clientConfig.name}:${connectionId}`)
  }

  async onModuleInit() {
    this.logger.verbose('Initializing...')
    try {
      await retry(
        {
          ...this.retryOptions,
          errorFilter: (error) => {
            this.logger.warn(`Initialize failed:\n${error}`)
            return this.retryOptions?.errorFilter?.(error) ?? true
          },
        },
        async () => {
          await this.initialize()
        },
      )
    } catch (e) {
      this.logger.fatal(`Cannot initialize`)
      throw e
    }
    this.logger.verbose('Initialized!')
  }

  async onModuleDestroy() {
    this.logger.verbose('Terminating...')
    try {
      await retry(
        {
          ...this.retryOptions,
          errorFilter: (error) => {
            this.logger.warn(`Terminate failed:\n${error}`)
            return this.retryOptions?.errorFilter?.(error) ?? true
          },
        },
        async () => {
          await this.terminate()
        },
      )
    } catch (e) {
      this.logger.error(`Cannot terminate:\n${e}`)
    }
    this.logger.verbose('Terminated!')
  }

  abstract initialize(): void | Promise<void>
  abstract terminate(): void | Promise<void>
}
