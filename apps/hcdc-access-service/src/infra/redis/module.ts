import { NodeEnv } from '@diut/common'
import { RedisModule, RedisModuleOptions } from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'

import {
  AppConfig,
  loadAppConfig,
  loadRedisConfig,
  RedisConfig,
} from 'src/config'
import { AUTH_CACHE_SERVICE_TOKEN, MUTEX_SERVICE_TOKEN } from 'src/domain'
import { REDIS_PRIMARY_CONNECTION, REDIS_SECONDARY_CONNECTION } from './common'
import { AuthCacheService } from './service/auth-cache'
import { MutexService } from './service/mutex'

function getCommonConfig(
  redisConfig: RedisConfig,
  appConfig: AppConfig,
): RedisModuleOptions {
  return {
    name: redisConfig.REDIS_MASTER_GROUP_NAME,
    replicaCount: redisConfig.REDIS_REPLICAS_COUNT,
    db: appConfig.NODE_ENV === NodeEnv.Production ? 0 : 1,
    sentinels: [
      {
        host: redisConfig.REDIS_SENTINEL_HOST,
        port: redisConfig.REDIS_SENTINEL_PORT,
      },
    ],
  }
}

export const redisMetadata: ModuleMetadata = {
  imports: [
    RedisModule.registerAsync({
      instanceId: REDIS_PRIMARY_CONNECTION,
      inject: [loadRedisConfig.KEY, loadAppConfig.KEY],
      useFactory: async (redisConfig: RedisConfig, appConfig: AppConfig) => ({
        role: 'master',
        ...getCommonConfig(redisConfig, appConfig),
      }),
    }),
    RedisModule.registerAsync({
      instanceId: REDIS_SECONDARY_CONNECTION,
      inject: [loadRedisConfig.KEY, loadAppConfig.KEY],
      useFactory: async (redisConfig: RedisConfig, appConfig: AppConfig) => ({
        role: 'slave',
        ...getCommonConfig(redisConfig, appConfig),
      }),
    }),
  ],
  providers: [
    {
      provide: AUTH_CACHE_SERVICE_TOKEN,
      useClass: AuthCacheService,
    },
    {
      provide: MUTEX_SERVICE_TOKEN,
      useClass: MutexService,
    },
  ],
}
