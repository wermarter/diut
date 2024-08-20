import {
  AwsS3ClientModule,
  AwsS3ClientService,
  ConfigModule,
  getAwsS3ClientServiceToken,
} from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'

import {
  IStorageService,
  StorageBucketToken,
  STORAGE_SERVICE_TOKEN,
} from 'src/domain'
import { MinioConfig, loadMinioConfig } from 'src/config'
import { StorageBucketProvider } from './bucket'

export const minioMetadata: ModuleMetadata = {
  imports: [
    AwsS3ClientModule.registerAsync({
      connectionId: 'MinIO',
      imports: [ConfigModule.forFeature(loadMinioConfig)],
      inject: [loadMinioConfig.KEY],
      useFactory: async (minioConfig: MinioConfig) => ({
        endpoint: `http://${minioConfig.MINIO_ENDPOINT}:${minioConfig.MINIO_PORT}`,
        region: minioConfig.MINIO_REGION,
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
      provide: STORAGE_SERVICE_TOKEN,
      useExisting: getAwsS3ClientServiceToken('MinIO'),
    },
    {
      provide: StorageBucketToken,
      useClass: StorageBucketProvider,
    },
  ],
}
