import { stringEnumValues } from '@diut/common'
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'

import { MinioConfig, loadMinioConfig } from 'src/config'
import {
  IStorageBucket,
  IStorageService,
  STORAGE_SERVICE_TOKEN,
  StorageBucket,
} from 'src/domain'

@Injectable()
export class StorageBucketProvider implements IStorageBucket, OnModuleInit {
  private logger = new Logger(StorageBucketProvider.name)

  constructor(
    @Inject(loadMinioConfig.KEY) private readonly minioConfig: MinioConfig,
    @Inject(STORAGE_SERVICE_TOKEN)
    private readonly storageService: IStorageService,
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

  async onModuleInit() {
    for (const bucketId of stringEnumValues(StorageBucket)) {
      const bucket = this.get(bucketId as StorageBucket)

      const isExisted = await this.storageService.assertBucket(bucket)
      if (!isExisted) {
        this.logger.verbose(`Bucket "${bucket}" created`)
      }
    }
  }
}
