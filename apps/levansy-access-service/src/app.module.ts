import {
  ConfigModule,
  LogModule,
  MinioModule,
  MongoModule,
} from '@diut/nest-core'
import { Inject, Module, ModuleMetadata, OnModuleInit } from '@nestjs/common'
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices'
import { ProtoPackage } from '@diut/common'
import { HELLO_SERVICE_NAME, HelloServiceClient } from '@diut/puppeteer-service'

import { resourceModules } from './resources'
import { AuthModule } from './auth'
import { AppConfig, loadAppConfig } from './configs/app.config'
import { MongoConfig, loadMongoConfig } from './configs/mongo.config'
import { MinioConfig, loadMinioConfig } from './configs/minio.config'
import { LogConfig, loadLogConfig } from './configs'
import { lastValueFrom } from 'rxjs'

const coreModules: ModuleMetadata['imports'] = [
  ConfigModule.forRoot({}),
  LogModule.forRootAsync({
    imports: [
      ConfigModule.forFeature(loadAppConfig),
      ConfigModule.forFeature(loadLogConfig),
    ],
    inject: [loadAppConfig.KEY, loadLogConfig.KEY],
    useFactory: async (appConfig: AppConfig, logConfig: LogConfig) => ({
      serviceName: appConfig.SERVICE_NAME,
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
  ClientsModule.register([
    {
      name: 'test-say-hello',
      transport: Transport.GRPC,
      options: {
        package: ProtoPackage.PuppeteerService,
        protoPath:
          'node_modules/@diut/puppeteer-service/dist/proto/package.proto',
        url: 'localhost:50051',
      },
    },
  ]),
]

@Module({
  imports: [...coreModules, ...resourceModules, AuthModule],
})
export class AppModule implements OnModuleInit {
  private helloServiceClient: HelloServiceClient

  constructor(@Inject('test-say-hello') private client: ClientGrpc) {
    this.helloServiceClient =
      this.client.getService<HelloServiceClient>(HELLO_SERVICE_NAME)
  }

  onModuleInit() {
    lastValueFrom(
      this.helloServiceClient.sayHello({ name: 'process.env.SERVICE_NAME' }),
    ).then(console.log)
  }
}
