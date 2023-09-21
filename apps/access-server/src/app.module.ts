import { Module, ModuleMetadata } from '@nestjs/common'

import { resourceModules } from './resources'
import { AuthModule } from './auth'
import {
  ConfigModule,
  LogModule,
  MinioModule,
  MongoModule,
  OtelModule,
} from '@diut/server-core'
import { AppConfig, loadServiceConfig } from './configs/app.config'
import { MongoConfig, loadMongoConfig } from './configs/mongo.config'
import { MinioConfig, loadMinioConfig } from './configs/minio.config'

const coreModules: ModuleMetadata['imports'] = [
  LogModule.forRootAsync({
    imports: [ConfigModule.forFeature(loadServiceConfig)],
    inject: [loadServiceConfig.KEY],
    useFactory: async (serviceConfig: AppConfig) => ({
      serviceName: serviceConfig.APP_SERVICE_NAME,
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
