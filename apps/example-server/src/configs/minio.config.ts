import { registerAs } from '@nestjs/config'
import { makeConfigLoader } from '@diut/server-core'
import { IsNumber, IsString, MinLength } from 'class-validator'

export class MinioConfig {
  @IsString()
  @MinLength(3)
  MINIO_ENDPOINT: string

  @IsNumber()
  MINIO_PORT: number

  @IsString()
  @MinLength(3)
  MINIO_ACCESS_KEY: string

  @IsString()
  @MinLength(3)
  MINIO_SECRET_KEY: string
}

export const loadMinioConfig = makeConfigLoader(MinioConfig)
