import { makeConfigLoader } from '@diut/nest-core'
import { IsNumber, IsString, MinLength } from 'class-validator'

export class MinioConfig {
  @IsString()
  @MinLength(1)
  MINIO_ENDPOINT: string

  @IsNumber()
  MINIO_PORT: number

  @IsString()
  @MinLength(1)
  MINIO_ACCESS_KEY: string

  @IsString()
  @MinLength(1)
  MINIO_SECRET_KEY: string

  @IsString()
  @MinLength(1)
  MINIO_SAMPLE_IMAGES_BUCKET: string

  @IsString()
  @MinLength(1)
  MINIO_PUBLIC_BUCKET: string
}

export const loadMinioConfig = makeConfigLoader(MinioConfig)
