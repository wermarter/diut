export const StorageServiceToken = Symbol('StorageService')

export interface IStorageService {
  upload(input: { bucket: string; key: string; buffer: Buffer }): Promise<void>
}
