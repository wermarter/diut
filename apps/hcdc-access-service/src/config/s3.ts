import { makeConfigLoader } from '@diut/nestjs-infra'
import { Expose } from 'class-transformer'
import { IsString, MinLength } from 'class-validator'

export class S3Config {
  @Expose()
  @MinLength(1)
  @IsString()
  S3_ACCESS_KEY: string

  @Expose()
  @MinLength(1)
  @IsString()
  S3_SECRET_KEY: string

  @Expose()
  @MinLength(1)
  @IsString()
  S3_REGION: string

  @Expose()
  @MinLength(1)
  @IsString()
  S3_SAMPLE_IMAGES_BUCKET: string

  @Expose()
  @MinLength(1)
  @IsString()
  S3_APP_BUCKET: string
}

export const loadS3Config = makeConfigLoader(S3Config)
