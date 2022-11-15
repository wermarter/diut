import { Body, RequestMethod } from '@nestjs/common'

import { AppController, AppRoute } from 'src/core'
import { CacheGetRequestDto, CacheSetRequestDto } from './redis-cache.dtos'
import { CacheService } from './redis-cache.service'

@AppController({ basePath: 'cache' })
export class RedisCacheController {
  constructor(private cacheService: CacheService) {}

  @AppRoute({ method: RequestMethod.POST, path: 'get' })
  getCachedValue(@Body() body: CacheGetRequestDto) {
    return this.cacheService.getValue(body.key, body.namespace)
  }

  @AppRoute({ method: RequestMethod.POST, path: 'set' })
  setCachedValue(@Body() body: CacheSetRequestDto) {
    return this.cacheService.setValue(
      body.key,
      body.value,
      body.ttl,
      body.namespace
    )
  }

  @AppRoute({ method: RequestMethod.POST, path: 'ttl' })
  getTTL(@Body() body: CacheGetRequestDto) {
    return this.cacheService.getTTL(body.key, body.namespace)
  }

  @AppRoute({ method: RequestMethod.DELETE })
  deleteKey(@Body() body: CacheGetRequestDto) {
    return this.cacheService.deleteKey(body.key, body.namespace)
  }
}
