import { Inject, Injectable } from '@nestjs/common'

import { MinioConfig, loadMinioConfig } from 'src/config'
import { IStorageBucket, StorageBucket } from 'src/domain'

@Injectable()
export class StorageBucketProvider implements IStorageBucket {
  constructor(
    @Inject(loadMinioConfig.KEY) private readonly minioConfig: MinioConfig,
  ) {}

  get(key: StorageBucket): string {
    switch (key) {
      case StorageBucket.APP:
        return this.minioConfig.MINIO_APP_BUCKET
      case StorageBucket.PUBLIC:
        return this.minioConfig.MINIO_PUBLIC_BUCKET
      case StorageBucket.SAMPLE_IMAGES:
        return this.minioConfig.MINIO_SAMPLE_IMAGES_BUCKET
      default:
        throw new Error('Invalid storage bucket')
    }
  }
}
