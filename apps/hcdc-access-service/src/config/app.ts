import { NodeEnv } from '@diut/common'
import { makeConfigLoader } from '@diut/nestjs-infra'
import { Expose, Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AppConfig {
  @Expose()
  @Type(() => Number)
  @IsNumber()
  HTTP_PORT: number

  @Expose()
  @IsString()
  @IsNotEmpty()
  SERVICE_NAME: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  REMINDER_URL_PREFIX: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  EXTERNAL_JWT_SECRET: string

  @Expose()
  @Type(() => Number)
  @IsNumber()
  EXTERNAL_JWT_EXPIRE_SECONDS: number

  @Expose()
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv
}

export const loadAppConfig = makeConfigLoader(AppConfig)
