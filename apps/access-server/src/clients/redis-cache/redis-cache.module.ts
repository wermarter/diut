import { CacheModule, Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { redisStore } from 'cache-manager-redis-store'

import { validateConfig } from 'src/core/config/validate-config'
import { RedisCacheConfig, REDIS_CACHE_CONFIG_NAME } from './redis-cache.config'
import { RedisCacheController } from './redis-cache.controller'
import { CacheService } from './redis-cache.service'

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      // @ts-ignore https://github.com/dabroek/node-cache-manager-redis-store/issues/40
      useFactory: async (configService: ConfigService) => {
        const config = validateConfig(RedisCacheConfig)(
          configService.get(REDIS_CACHE_CONFIG_NAME)
        )
        const store = await redisStore({
          socket: {
            host: config.host,
            port: config.port,
          },
        })

        return {
          store: () => store,
        }
      },
    }),
  ],
  providers: [CacheService],
  controllers: [RedisCacheController],
  exports: [CacheService],
})
export class RedisCacheModule {}
