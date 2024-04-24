import { Inject, Injectable } from '@nestjs/common'
import {
  Callback,
  CommonRedisOptions,
  Redis,
  Result,
  SentinelConnectionOptions,
} from 'ioredis'
import { retry } from 'async'

import { AbstractClientService } from '../service'
import { MODULE_OPTIONS_TOKEN } from './module-builder'

export type RedisClientOptions = CommonRedisOptions &
  SentinelConnectionOptions & {
    connectionId?: string
    replicaCount: number
  }

export type RedisValue = string | Buffer | number

export enum LoadedLuaScript {
  /**
   * KEYS[1]: mutex key
   *
   * ARGV[1]: mutex value
   */
  MutexUnlock = 'MutexUnlock',
}

declare module 'ioredis' {
  interface RedisCommander<Context> {
    [LoadedLuaScript.MutexUnlock](
      mutexKey: string,
      mutexValue: string,
      callback?: Callback<number>,
    ): Result<number, Context>
  }
}

const defaultOptions: Partial<RedisClientOptions> = {
  // https://www.youtube.com/watch?v=0L0ER4pZbX4
  enableAutoPipelining: true,
  scripts: {
    [LoadedLuaScript.MutexUnlock]: {
      lua: `
        if redis.call("get", KEYS[1]) == ARGV[1] then
            return redis.call("del", KEYS[1])
        else
            return 0
        end`,
      numberOfKeys: 1,
    },
  },
}

function RequireMaster() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod: Function = descriptor.value
    descriptor.value = async function (...args: any[]) {
      const { role } = this.clientOptions
      if (role === 'slave') {
        throw new Error(`calling ${propertyKey}() from slave connection`)
      }

      return originalMethod.apply(this, args)
    }
  }
}

@Injectable()
export class RedisClientService extends AbstractClientService {
  public client: Redis

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly clientOptions: RedisClientOptions,
  ) {
    super({
      name: RedisClientService.name,
      connectionId: clientOptions.connectionId,
    })
  }

  async readyCheck() {
    await this.client.ping()
  }

  async connect() {
    this.client = new Redis({ ...defaultOptions, ...this.clientOptions })
    await this.readyCheck()
  }

  async close() {
    await this.client.quit()
  }

  @RequireMaster()
  async synchronize() {
    const { replicaCount } = this.clientOptions
    const ackCount = await this.client.wait(replicaCount, 2000)

    if (ackCount < replicaCount) {
      this.logger.warn(
        `synchronize failed: ackCount:${ackCount} < replicaCount:${replicaCount}`,
      )
    }
  }

  private async mutexLock(lockKey: string, lockValue: string, ttl: number) {
    const result = await this.client.set(lockKey, lockValue, 'EX', ttl, 'NX')

    const isLockAcquired = result === 'OK'
    if (isLockAcquired) {
      await this.synchronize()
    }

    return isLockAcquired
  }

  private async mutexUnlock(lockKey: string, lockValue: string) {
    const result = await this.client[LoadedLuaScript.MutexUnlock](
      lockKey,
      lockValue,
    )

    const isLockReleased = result === 1
    if (isLockReleased) {
      await this.synchronize()
    }

    return isLockReleased
  }

  /**
   * note: replace with Redlock for Redis Cluster setup
   */
  @RequireMaster()
  async mutex<T>(
    lockIdentifier: string,
    executionTimeout: number, // seconds
    executeCriticalCode: (signal: AbortSignal) => Promise<T>,
    acquireLockTimeout = 5, // seconds
  ): Promise<T> {
    const lockKey = `mutex:${lockIdentifier}`
    const lockValue = Math.random().toString()

    await retry(
      {
        interval: 100,
        times: acquireLockTimeout * 10,
        errorFilter(error) {
          return error?.message === 'cannot acquire mutex lock'
        },
      },
      async () => {
        const isLockAcquired = await this.mutexLock(
          lockKey,
          lockValue,
          executionTimeout,
        )
        if (!isLockAcquired) {
          throw new Error('cannot acquire mutex lock')
        }
      },
    )

    let executionError: Error | undefined = undefined

    try {
      const rv = await executeCriticalCode(
        AbortSignal.timeout(executionTimeout * 1000),
      ).catch((e) => {
        executionError = e
        throw e
      })

      return rv
    } finally {
      const isLockReleased = await this.mutexUnlock(lockKey, lockValue)

      if (executionError !== undefined) {
        throw executionError
      }

      if (!isLockReleased) {
        throw new Error('cannot release mutex lock')
      }
    }
  }
}
