import { NodeEnv } from '@diut/common'
import {
  RedisClientModule,
  RedisClientService,
  ConfigModule,
} from '@diut/nestjs-infra'
import { Module } from '@nestjs/common'
import { ClassConstructor } from 'class-transformer'

import { ICacheSecondaryService, CacheSecondaryServiceToken } from 'src/domain'
import {
  AppConfig,
  RedisConfig,
  loadAppConfig,
  loadRedisConfig,
} from 'src/config'

@Module({
  imports: [
    RedisClientModule.registerAsync({
      imports: [
        ConfigModule.forFeature(loadRedisConfig),
        ConfigModule.forFeature(loadAppConfig),
      ],
      inject: [loadRedisConfig.KEY, loadAppConfig.KEY],
      useFactory: async (redisConfig: RedisConfig, appConfig: AppConfig) => ({
        connectionId: 'Secondary',
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
      provide: CacheSecondaryServiceToken,
      useExisting:
        RedisClientService satisfies ClassConstructor<ICacheSecondaryService>,
    },
  ],
  exports: [CacheSecondaryServiceToken],
})
export class CacheSecondaryModule {}
