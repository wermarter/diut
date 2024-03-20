export const StorageBucketToken = Symbol('StorageBucketToken')

export enum StorageBucket {
  APP = 'APP',
  PUBLIC = 'PUBLIC',
  SAMPLE_IMAGES = 'SAMPLE_IMAGES',
}

export interface IStorageBucket {
  get(key: StorageBucket): string
}
