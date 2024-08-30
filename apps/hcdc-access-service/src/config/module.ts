import { ConfigModule } from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'

import { loadAppConfig } from './app'
import { loadAuthConfig } from './auth'
import { loadClientConfig } from './client'
import { loadMinioConfig } from './minio'
import { loadMongoConfig } from './mongo'
import { loadRedisConfig } from './redis'

export const configMetadata: ModuleMetadata = {
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        loadAppConfig,
        loadAuthConfig,
        loadClientConfig,
        loadMinioConfig,
        loadMongoConfig,
        loadRedisConfig,
      ],
    }),
  ],
}
