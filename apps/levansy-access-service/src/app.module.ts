import {
  ConfigModule,
  DIUT_PACKAGE_NAME,
  LogModule,
  MinioModule,
  MongoModule,
  resolveProtoPath,
  PUPPETEER_SERVICE_NAME,
  PuppeteerServiceClient,
  ProtobufService,
} from '@diut/nest-core'
import {
  Inject,
  Logger,
  Module,
  ModuleMetadata,
  OnModuleInit,
} from '@nestjs/common'
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

import { resourceModules } from './resources'
import { AuthModule } from './auth'
import {
  Client,
  LogConfig,
  loadClientConfig,
  loadLogConfig,
  AppConfig,
  loadAppConfig,
  MongoConfig,
  loadMongoConfig,
  MinioConfig,
  loadMinioConfig,
  ClientConfig,
} from './configs'

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
  ClientsModule.registerAsync({
    isGlobal: true,
    clients: [
      {
        name: Client.PuppeteerService,
        imports: [ConfigModule.forFeature(loadClientConfig)],
        inject: [loadClientConfig.KEY],
        useFactory: async (clientConfig: ClientConfig) => {
          return {
            transport: Transport.GRPC,
            options: {
              package: DIUT_PACKAGE_NAME,
              protoPath: resolveProtoPath(ProtobufService.Puppeteer),
              url: clientConfig.PUPPETEER_SERVICE_URL,
            },
          }
        },
      },
    ],
  }),
]

@Module({
  imports: [...coreModules, ...resourceModules, AuthModule],
})
export class AppModule implements OnModuleInit {
  private puppeteerService: PuppeteerServiceClient
  private logger = new Logger(AppModule.name)

  constructor(@Inject(Client.PuppeteerService) private client: ClientGrpc) {
    this.puppeteerService = this.client.getService<PuppeteerServiceClient>(
      PUPPETEER_SERVICE_NAME,
    )
  }

  async onModuleInit() {
    const rv = await lastValueFrom(
      this.puppeteerService.sayHello({ name: process.env.SERVICE_NAME }),
    )

    this.logger.log(rv.response)
  }
}
