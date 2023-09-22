import {
  ConfigModule,
  LogModule,
  MinioModule,
  MongoModule,
  OtelModule,
} from '@diut/server-core'
import { Module, ModuleMetadata } from '@nestjs/common'

import { resourceModules } from './resources'
import { AuthModule } from './auth'
import { AppConfig, loadAppConfig } from './configs/app.config'
import { MongoConfig, loadMongoConfig } from './configs/mongo.config'
import { MinioConfig, loadMinioConfig } from './configs/minio.config'
import { LogConfig, loadLogConfig } from './configs'

const coreModules: ModuleMetadata['imports'] = [
  LogModule.forRootAsync({
    imports: [
      ConfigModule.forFeature(loadAppConfig),
      ConfigModule.forFeature(loadLogConfig),
    ],
    inject: [loadAppConfig.KEY, loadLogConfig.KEY],
    useFactory: async (serviceConfig: AppConfig, logConfig: LogConfig) => ({
      serviceName: serviceConfig.APP_SERVICE_NAME,
      lokiUrl: logConfig.LOKI_URL,
    }),
  }),
  MongoModule.forRootAsync({
    imports: [ConfigModule.forFeature(loadMongoConfig)],
    inject: [loadMongoConfig.KEY],
    useFactory: async (mongoConfig: MongoConfig) => ({
      uri: mongoConfig.MONGO_URI,
    }),
  }),
  MinioModule.forRootAsync({
    imports: [ConfigModule.forFeature(loadMinioConfig)],
    inject: [loadMinioConfig.KEY],
    useFactory: async (minioConfig: MinioConfig) => ({
      endPoint: minioConfig.MINIO_ENDPOINT,
      port: minioConfig.MINIO_PORT,
      useSSL: false,
      accessKey: minioConfig.MINIO_ACCESS_KEY,
      secretKey: minioConfig.MINIO_SECRET_KEY,
    }),
  }),
  OtelModule,
]

@Module({
  imports: [...coreModules, ...resourceModules, AuthModule],
})
export class AppModule {}
