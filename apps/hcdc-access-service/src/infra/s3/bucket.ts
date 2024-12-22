import { stringEnumValues } from '@diut/common'
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { S3Config, loadS3Config } from 'src/config'
import {
  IStorageBucket,
  IStorageService,
  STORAGE_SERVICE_TOKEN,
  StorageBucket,
} from 'src/domain'

@Injectable()
export class StorageBucketProvider implements IStorageBucket, OnModuleInit {
  private logger = new Logger(this.constructor.name)

  constructor(
    @Inject(loadS3Config.KEY) private readonly s3Config: S3Config,
    @Inject(STORAGE_SERVICE_TOKEN)
    private readonly storageService: IStorageService,
  ) {}

  get(key: StorageBucket): string {
    switch (key) {
      case StorageBucket.APP:
        return this.s3Config.S3_APP_BUCKET
      case StorageBucket.SAMPLE_IMAGES:
        return this.s3Config.S3_SAMPLE_IMAGES_BUCKET
      default:
        throw new Error('Invalid storage bucket')
    }
  }

  async onModuleInit() {
    try {
      for (const bucketId of stringEnumValues(StorageBucket)) {
        const bucket = this.get(bucketId as StorageBucket)

        const isExisted = await this.storageService.assertBucket(bucket)
        if (!isExisted) {
          this.logger.verbose(`Bucket "${bucket}" created`)
        }
      }
    } catch (error) {
      process.nextTick(() => {
        throw error
      })
    }
  }
}
