import {
  ConfigModule,
  MinioModule,
  concatModuleMetadata,
} from '@diut/nest-core'
import { Module, ModuleMetadata } from '@nestjs/common'

import { MinioConfig, loadMinioConfig } from './configs'
import { infrastructureMetadata } from './infrastructure'
import { useCaseMetadata } from './domain'
import { presentationMetadata } from './presentation'

const coreModules: ModuleMetadata['imports'] = [
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
]

@Module(
  concatModuleMetadata([
    infrastructureMetadata,
    presentationMetadata,
    useCaseMetadata,
  ]),
)
export class AppModule {}
