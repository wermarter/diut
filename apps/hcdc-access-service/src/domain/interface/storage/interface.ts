import { AwsS3ClientService } from '@diut/nestjs-infra'

import { StorageBucket } from './bucket'

export const StorageServiceToken = Symbol('StorageService')

export interface IStorageService
  extends AwsS3ClientService<`${StorageBucket}`> {}
