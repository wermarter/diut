import { AwsS3ClientModule, getAwsS3ServiceToken } from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'
import { MinioConfig, loadMinioConfig } from 'src/config'
import { STORAGE_BUCKET_TOKEN, STORAGE_SERVICE_TOKEN } from 'src/domain'
import { StorageBucketProvider } from './bucket'

const MINIO_INSTANCE_ID = 'MinIO'

export const minioMetadata: ModuleMetadata = {
  imports: [
    AwsS3ClientModule.registerAsync({
      instanceId: MINIO_INSTANCE_ID,
      inject: [loadMinioConfig.KEY],
      useFactory: async (minioConfig: MinioConfig) => ({
        bucketName: minioConfig.MINIO_PUBLIC_BUCKET,
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
      useExisting: getAwsS3ServiceToken(MINIO_INSTANCE_ID),
    },
    {
      provide: STORAGE_BUCKET_TOKEN,
      useClass: StorageBucketProvider,
    },
  ],
}
