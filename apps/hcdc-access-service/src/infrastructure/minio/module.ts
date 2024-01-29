import { ConfigModule, MinioModule, MinioService } from '@diut/nestjs-core'
import { ModuleMetadata } from '@nestjs/common'

import { IStorageService, StorageServiceToken } from 'src/domain'
import { MinioConfig, loadMinioConfig } from 'src/config'

export const minioMetadata: ModuleMetadata = {
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
      provide: StorageServiceToken,
      useClass: MinioService satisfies IStorageService,
    },
  ],
}
