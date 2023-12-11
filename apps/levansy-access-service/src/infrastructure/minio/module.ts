import { ConfigModule, MinioModule, MinioService } from '@diut/nest-core'
import { ModuleMetadata } from '@nestjs/common'

import { MinioConfig, loadMinioConfig } from '../config'
import { IMinioService, MinioServiceToken } from 'src/domain'

export const minioServiceMetadata: ModuleMetadata = {
  imports: [
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
  ],
  providers: [
    {
      provide: MinioServiceToken,
      useClass: MinioService satisfies IMinioService,
    },
  ],
}
