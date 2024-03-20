import { AwsS3ClientService } from '@diut/nestjs-infra'

export const StorageServiceToken = Symbol('StorageService')

export interface IStorageService extends AwsS3ClientService {}
