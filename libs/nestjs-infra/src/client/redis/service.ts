import { Inject, Injectable } from '@nestjs/common'
import { Redis, RedisOptions } from 'ioredis'

import { AbstractClientService } from '../service'
import { MODULE_OPTIONS_TOKEN } from './module-builder'

export type RedisClientOptions = RedisOptions & {
  connectionId?: string
  replicaCount: number
}

export type RedisValue = string | Buffer | number

const defaultOptions: RedisOptions = {
  // https://www.youtube.com/watch?v=0L0ER4pZbX4
  enableAutoPipelining: true,
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

  async synchronize() {
    const { replicaCount, role } = this.clientOptions
    if (role === 'slave') {
      this.logger.warn('calling synchronize from slave connection')
      return
    }

    const ackCount = await this.client.wait(replicaCount, 5000)

    if (ackCount < replicaCount) {
      this.logger.warn(`ackCount:${ackCount} < replicaCount:${replicaCount}`)
    }
  }
}
