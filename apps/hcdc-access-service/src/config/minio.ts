import { makeConfigLoader } from '@diut/nestjs-infra'
import { Expose } from 'class-transformer'
import { IsNumber, IsString, MinLength } from 'class-validator'

export class MinioConfig {
  @Expose()
  @IsString()
  @MinLength(1)
  MINIO_ENDPOINT: string

  @Expose()
  @IsNumber()
  MINIO_PORT: number

  @Expose()
  @IsString()
  @MinLength(1)
  MINIO_ACCESS_KEY: string

  @Expose()
  @IsString()
  @MinLength(1)
  MINIO_SECRET_KEY: string

  @Expose()
  @IsString()
  @MinLength(1)
  MINIO_SAMPLE_IMAGES_BUCKET: string

  @Expose()
  @IsString()
  @MinLength(1)
  MINIO_PUBLIC_BUCKET: string

  @Expose()
  @IsString()
  @MinLength(1)
  MINIO_APP_BUCKET: string

  @Expose()
  @IsString()
  @MinLength(1)
  MINIO_REGION: string
}

export const loadMinioConfig = makeConfigLoader(MinioConfig)
