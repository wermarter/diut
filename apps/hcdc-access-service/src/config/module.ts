import { ConfigModule } from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'

import { loadAppConfig } from './app'
import { loadAuthConfig } from './auth'
import { loadMinioConfig } from './minio'
import { loadClientConfig } from './client'
import { loadMongoConfig } from './mongo'
import { loadLogConfig } from './log'

export const configMetadata: ModuleMetadata = {
  imports: [
    ConfigModule.forRoot({}),
    ConfigModule.forFeature(loadAppConfig),
    ConfigModule.forFeature(loadAuthConfig),
    ConfigModule.forFeature(loadClientConfig),
    ConfigModule.forFeature(loadLogConfig),
    ConfigModule.forFeature(loadMinioConfig),
    ConfigModule.forFeature(loadMongoConfig),
  ],
}
