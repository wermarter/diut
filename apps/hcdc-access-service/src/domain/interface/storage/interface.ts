import { AwsS3ClientService } from '@diut/nestjs-infra'

export const STORAGE_SERVICE_TOKEN = Symbol('StorageService')

export interface IStorageService extends AwsS3ClientService {}
