import { ConfigModule } from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'

import { loadAppConfig } from './app'
import { loadAuthConfig } from './auth'
import { loadMinioConfig } from './minio'
import { loadClientConfig } from './client'
import { loadMongoConfig } from './mongo'
import { loadLogConfig } from './log'
import { loadRedisConfig } from './redis'

export const configMetadata: ModuleMetadata = {
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        loadAppConfig,
        loadAuthConfig,
        loadClientConfig,
        loadLogConfig,
        loadMinioConfig,
        loadMongoConfig,
        loadRedisConfig,
      ],
    }),
  ],
}
