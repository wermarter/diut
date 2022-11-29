import { IsNumber, IsString } from 'class-validator'

export const STORAGE_CONFIG_NAME = 'storage'

export class StorageConfig {
  @IsString()
  endPoint: string

  @IsNumber()
  port: number

  @IsString()
  accessKey: string

  @IsString()
  secretKey: string
}
