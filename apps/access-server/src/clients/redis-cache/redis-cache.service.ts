import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common'
import { Cache, Store } from 'cache-manager'
import type { RedisClientType } from 'redis'

interface RedisCache extends Cache {
  store: RedisStore
}

interface RedisStore extends Store {
  name: 'redis'
  getClient: () => RedisClientType
  isCacheableValue: (value: any) => boolean
}

@Injectable()
export class CacheService implements OnApplicationShutdown {
  private client: RedisClientType
  private logger: Logger

  constructor(@Inject(CACHE_MANAGER) private cacheManager: RedisCache) {
    this.logger = new Logger(CacheService.name)
    this.client = cacheManager.store.getClient()

    this.client.on('error', (error) => {
      // TODO: update Redis to fix reconnecting error
      // https://github.com/redis/node-redis/issues/1985
      // hotfix should be in cache-manager-node-redis, not here!
      this.logger.warn(error)
    })
  }

  async onApplicationShutdown(signal?: string) {
    await this.client.quit()
  }

  private getCombinedKey(key: string, namespace?: string) {
    return namespace?.length > 0 ? `${namespace}:${key}` : key
  }

  getTTL(key: string, namespace?: string) {
    const combinedKey = this.getCombinedKey(key, namespace)
    return this.client.ttl(combinedKey)
  }

  getValue<T = unknown>(key: string, namespace?: string) {
    const combinedKey = this.getCombinedKey(key, namespace)
    return this.cacheManager.get<T>(combinedKey)
  }

  setValue(key: string, value: unknown, ttl?: number, namespace?: string) {
    const combinedKey = this.getCombinedKey(key, namespace)
    return this.client.set(combinedKey, JSON.stringify(value), { EX: ttl })
  }

  deleteKey(key: string, namespace?: string) {
    const combinedKey = this.getCombinedKey(key, namespace)
    return this.cacheManager.del(combinedKey)
  }

  async getOrSetValue<T = unknown>(
    key: string,
    valueCallback: () => Promise<T> | T,
    namespace?: string,
    ttl?: number
  ): Promise<T> {
    const cachedValue = await this.getValue<T>(key, namespace)

    if (cachedValue != undefined) {
      return cachedValue
    }

    const newValue = await valueCallback()
    await this.setValue(key, newValue, ttl, namespace)

    return newValue
  }
}
