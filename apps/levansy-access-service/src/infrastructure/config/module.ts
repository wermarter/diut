import { ConfigModule } from '@diut/nest-core'
import { ModuleMetadata } from '@nestjs/common'
import { identity } from 'lodash'

import {
  AppConfigToken,
  AuthConfigToken,
  IMinioConfig,
  MinioConfigToken,
} from 'src/domain'
import { loadAppConfig } from './app.config'
import { loadAuthConfig } from './auth.config'
import { MinioConfig, loadMinioConfig } from './minio.config'
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
  providers: [
    {
      provide: AppConfigToken,
      inject: [loadAppConfig.KEY],
      useFactory: identity,
    },
    {
      provide: AuthConfigToken,
      inject: [loadAuthConfig.KEY],
      useFactory: identity,
    },
    {
      provide: MinioConfigToken,
      inject: [loadMinioConfig.KEY],
      useFactory: (minioConfig: MinioConfig): IMinioConfig => {
        return {
          MINIO_PUBLIC_BUCKET: minioConfig.MINIO_PUBLIC_BUCKET,
          MINIO_SAMPLE_IMAGES_BUCKET: minioConfig.MINIO_SAMPLE_IMAGES_BUCKET,
        }
      },
    },
  ],
}
