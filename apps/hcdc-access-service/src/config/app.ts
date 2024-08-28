import { NodeEnv } from '@diut/common'
import { makeConfigLoader } from '@diut/nestjs-infra'
import { Expose } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AppConfig {
  @Expose()
  @IsNumber()
  HTTP_PORT: number

  @Expose()
  @IsNotEmpty()
  @IsString()
  SERVICE_NAME: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  EXTERNAL_URL_PREFIX: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  EXTERNAL_JWT_SECRET: string

  @Expose()
  @IsNumber()
  EXTERNAL_JWT_EXPIRE_SECONDS: number

  @Expose()
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv
}

export const loadAppConfig = makeConfigLoader(AppConfig)
