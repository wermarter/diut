import {
  ConfigModule,
  LogModule,
  MinioModule,
  MinioService,
  MongoModule,
  OtelModule,
} from '@diut/server-core'
import { Logger, Module, OnModuleInit } from '@nestjs/common'

import { ServiceConfig, loadServiceConfig } from './configs/service.config'
import { MongoConfig, loadMongoConfig } from './configs/mongo.config'
import { MinioConfig, loadMinioConfig } from './configs/minio.config'

@Module({
  imports: [
    LogModule.forRootAsync({
      imports: [ConfigModule.forFeature(loadServiceConfig)],
      inject: [loadServiceConfig.KEY],
      useFactory: async (serviceConfig: ServiceConfig) => ({
        serviceName: serviceConfig.SERVICE_NAME,
      }),
    }),
    // MongoModule.forRootAsync({
    //   imports: [ConfigModule.forFeature(loadMongoConfig)],
    //   inject: [loadMongoConfig.KEY],
    //   useFactory: async (mongoConfig: MongoConfig) => ({
    //     uri: mongoConfig.MONGO_URI,
    //   }),
    // }),
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
  ],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name)

  constructor(private readonly minioService: MinioService) {}

  async onModuleInit() {
    this.logger.log(await this.minioService.client.listBuckets())
  }
}
