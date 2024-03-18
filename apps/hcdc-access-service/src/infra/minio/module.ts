import {
  AwsS3ClientModule,
  AwsS3ClientService,
  ConfigModule,
} from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'
import { ClassConstructor } from 'class-transformer'

import { IStorageService, StorageServiceToken } from 'src/domain'
import { MinioConfig, loadMinioConfig } from 'src/config'

export const minioMetadata: ModuleMetadata = {
  imports: [
    AwsS3ClientModule.registerAsync({
      imports: [ConfigModule.forFeature(loadMinioConfig)],
      inject: [loadMinioConfig.KEY],
      useFactory: async (minioConfig: MinioConfig) => ({
        connectionId: 'minio',
        endpoint: `http://${minioConfig.MINIO_ENDPOINT}:${minioConfig.MINIO_PORT}`,
        credentials: {
          accessKeyId: minioConfig.MINIO_ACCESS_KEY,
          secretAccessKey: minioConfig.MINIO_SECRET_KEY,
        },
        forcePathStyle: true,
      }),
    }),
  ],
  providers: [
    {
      provide: StorageServiceToken,
      useExisting:
        AwsS3ClientService satisfies ClassConstructor<IStorageService>,
    },
  ],
}
