import { ConfigModule } from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'
import { loadAppConfig } from './app'
import { loadAuthConfig } from './auth'
import { loadClientConfig } from './client'
import { loadMongoConfig } from './mongo'
import { loadRedisConfig } from './redis'
import { loadS3Config } from './s3'
import { loadTelemetryConfig } from './telemetry'

export const configMetadata: ModuleMetadata = {
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        loadAppConfig,
        loadAuthConfig,
        loadClientConfig,
        loadS3Config,
        loadMongoConfig,
        loadRedisConfig,
        loadTelemetryConfig,
      ],
    }),
  ],
}
