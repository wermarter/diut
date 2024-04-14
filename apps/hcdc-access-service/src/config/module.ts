import { ConfigModule } from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'

import { loadAppConfig } from './app.config'
import { loadAuthConfig } from './auth.config'
import { loadMinioConfig } from './minio.config'
import { loadClientConfig } from './client.config'
import { loadMongoConfig } from './mongo.config'
import { loadLogConfig } from './log.config'

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
