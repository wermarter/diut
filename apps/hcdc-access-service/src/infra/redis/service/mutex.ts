import { getRedisServiceToken, RedisService } from '@diut/nestjs-infra'
import { Inject, Injectable } from '@nestjs/common'

import { IMutexService } from 'src/domain'
import { REDIS_PRIMARY_CONNECTION } from '../common'

@Injectable()
export class MutexService implements IMutexService {
  constructor(
    @Inject(getRedisServiceToken(REDIS_PRIMARY_CONNECTION))
    private readonly client: RedisService,
  ) {}

  mutex<T>(
    lockIdentifier: string,
    executionTimeout: number,
    executeCriticalCode: (signal: AbortSignal) => Promise<T>,
    acquireLockTimeout?: number,
  ): Promise<T> {
    return this.client.mutex<T>(
      lockIdentifier,
      executionTimeout,
      executeCriticalCode,
      acquireLockTimeout,
    )
  }
}
