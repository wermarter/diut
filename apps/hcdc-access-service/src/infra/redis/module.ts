import { ModuleMetadata } from '@nestjs/common'

import {
  ConfigModule,
  getRedisClientModuleToken,
  RedisClientModule,
} from '@diut/nestjs-infra'
import { NodeEnv } from '@diut/common'

import {
  AppConfig,
  loadAppConfig,
  loadRedisConfig,
  RedisConfig,
} from 'src/config'
import {
  CachePrimaryServiceToken,
  CacheSecondaryServiceToken,
} from 'src/domain'

export const redisMetadata: ModuleMetadata = {
  imports: [
    RedisClientModule.registerAsync({
      connectionId: 'Primary',
      imports: [
        ConfigModule.forFeature(loadRedisConfig),
        ConfigModule.forFeature(loadAppConfig),
      ],
      inject: [loadRedisConfig.KEY, loadAppConfig.KEY],
      useFactory: async (redisConfig: RedisConfig, appConfig: AppConfig) => ({
        role: 'master',
        name: redisConfig.REDIS_MASTER_GROUP_NAME,
        replicaCount: redisConfig.REDIS_REPLICAS_COUNT,
        db: appConfig.NODE_ENV === NodeEnv.Production ? 0 : 1,
        sentinels: [
          {
            host: redisConfig.REDIS_SENTINEL_HOST,
            port: redisConfig.REDIS_SENTINEL_PORT,
          },
        ],
      }),
    }),
    RedisClientModule.registerAsync({
      connectionId: 'Secondary',
      imports: [
        ConfigModule.forFeature(loadRedisConfig),
        ConfigModule.forFeature(loadAppConfig),
      ],
      inject: [loadRedisConfig.KEY, loadAppConfig.KEY],
      useFactory: async (redisConfig: RedisConfig, appConfig: AppConfig) => ({
        role: 'slave',
        name: redisConfig.REDIS_MASTER_GROUP_NAME,
        replicaCount: redisConfig.REDIS_REPLICAS_COUNT,
        db: appConfig.NODE_ENV === NodeEnv.Production ? 0 : 1,
        sentinels: [
          {
            host: redisConfig.REDIS_SENTINEL_HOST,
            port: redisConfig.REDIS_SENTINEL_PORT,
          },
        ],
      }),
    }),
  ],
  providers: [
    {
      provide: CachePrimaryServiceToken,
      useExisting: getRedisClientModuleToken('Primary'),
    },
    {
      provide: CacheSecondaryServiceToken,
      useExisting: getRedisClientModuleToken('Secondary'),
    },
  ],
}
