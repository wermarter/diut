import {
  ConfigModule,
  DIUT_PACKAGE_NAME,
  LogModule,
  MinioModule,
  MongoModule,
  resolveProtoPath,
  ProtobufService,
  PUPPETEER_SERVICE_NAME,
} from '@diut/nest-core'
import {
  Inject,
  Logger,
  Module,
  ModuleMetadata,
  OnModuleInit,
} from '@nestjs/common'
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices'

import { resourceModules } from './resources'
import { AuthModule } from './auth'
import {
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
        name: PUPPETEER_SERVICE_NAME,
        imports: [ConfigModule.forFeature(loadClientConfig)],
        inject: [loadClientConfig.KEY],
        useFactory: async (clientConfig: ClientConfig) => {
          return {
            transport: Transport.GRPC,
            options: {
              package: DIUT_PACKAGE_NAME,
              protoPath: resolveProtoPath(ProtobufService.Puppeteer, __dirname),
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
  private logger = new Logger(AppModule.name)

  constructor(@Inject(PUPPETEER_SERVICE_NAME) private client: ClientGrpc) {}

  async onModuleInit() {
    return
  }
}
