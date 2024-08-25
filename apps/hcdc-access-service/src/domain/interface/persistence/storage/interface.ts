import { AwsS3ClientService } from '@diut/nestjs-infra'

export const STORAGE_SERVICE_TOKEN = Symbol('STORAGE_SERVICE_TOKEN')

export interface IStorageService extends AwsS3ClientService {}
