// import { registerAs } from '@nestjs/config'
import { makeConfigLoader } from '@diut/server-core'
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator'

export class MinioConfig {
  @IsOptional()
  @IsString()
  @MinLength(3)
  MINIO_ENDPOINT = 'localhost'

  @IsOptional()
  @IsNumber()
  MINIO_PORT = 9000

  @IsString()
  @MinLength(3)
  MINIO_ACCESS_KEY: string

  @IsString()
  @MinLength(3)
  MINIO_SECRET_KEY: string
}

export const loadMinioConfig = makeConfigLoader(MinioConfig)
