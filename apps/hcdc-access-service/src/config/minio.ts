import { makeConfigLoader } from '@diut/nestjs-infra'
import { Expose } from 'class-transformer'
import { IsNumber, IsString, MinLength } from 'class-validator'

export class MinioConfig {
  @Expose()
  @MinLength(1)
  @IsString()
  MINIO_ENDPOINT: string

  @Expose()
  @IsNumber()
  MINIO_PORT: number

  @Expose()
  @MinLength(1)
  @IsString()
  MINIO_ACCESS_KEY: string

  @Expose()
  @MinLength(1)
  @IsString()
  MINIO_SECRET_KEY: string

  @Expose()
  @MinLength(1)
  @IsString()
  MINIO_SAMPLE_IMAGES_BUCKET: string

  @Expose()
  @MinLength(1)
  @IsString()
  MINIO_PUBLIC_BUCKET: string

  @Expose()
  @MinLength(1)
  @IsString()
  MINIO_APP_BUCKET: string

  @Expose()
  @MinLength(1)
  @IsString()
  MINIO_REGION: string
}

export const loadMinioConfig = makeConfigLoader(MinioConfig)
