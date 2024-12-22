import { AwsS3ClientModule, getAwsS3ServiceToken } from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'
import { S3Config, loadS3Config } from 'src/config'
import { STORAGE_BUCKET_TOKEN, STORAGE_SERVICE_TOKEN } from 'src/domain'
import { StorageBucketProvider } from './bucket'

const S3_INSTANCE_ID = 'S3'

export const s3Metadata: ModuleMetadata = {
  imports: [
    AwsS3ClientModule.registerAsync({
      instanceId: S3_INSTANCE_ID,
      inject: [loadS3Config.KEY],
      useFactory: async (s3Config: S3Config) => ({
        bucketName: s3Config.S3_SAMPLE_IMAGES_BUCKET,
        region: s3Config.S3_REGION,
        credentials: {
          accessKeyId: s3Config.S3_ACCESS_KEY,
          secretAccessKey: s3Config.S3_SECRET_KEY,
        },
      }),
    }),
  ],
  providers: [
    {
      provide: STORAGE_SERVICE_TOKEN,
      useExisting: getAwsS3ServiceToken(S3_INSTANCE_ID),
    },
    {
      provide: STORAGE_BUCKET_TOKEN,
      useClass: StorageBucketProvider,
    },
  ],
}
