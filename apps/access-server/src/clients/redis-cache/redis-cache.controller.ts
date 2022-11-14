import { Body, CACHE_MANAGER, Inject, RequestMethod } from '@nestjs/common'
import { Cache } from 'cache-manager'

import { AppController, AppRoute } from 'src/core'
import { CacheGetRequestDto, CacheSetRequestDto } from './redis-cache.dto'

@AppController({ basePath: 'cache' })
export class RedisCacheController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @AppRoute({ isPublic: true, method: RequestMethod.POST, path: 'get' })
  getCachedValue(@Body() body: CacheGetRequestDto) {
    return this.cacheManager.get(body.key)
  }

  @AppRoute({ isPublic: true, method: RequestMethod.POST, path: 'set' })
  setCachedValue(@Body() body: CacheSetRequestDto) {
    return this.cacheManager.set(body.key, body.value)
  }
}
