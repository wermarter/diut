import { Type } from 'class-transformer'
import { IsNumber, IsString } from 'class-validator'

export const STORAGE_CONFIG_NAME = 'storage'

export class StorageConfig {
  @IsString()
  endPoint: string

  @Type(() => Number)
  @IsNumber()
  port: number

  @IsString()
  accessKey: string

  @IsString()
  secretKey: string
}
