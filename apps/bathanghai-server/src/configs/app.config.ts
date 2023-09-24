import { makeConfigLoader } from '@diut/server-core'
import { IsEnum, IsNumber, IsString, MinLength } from 'class-validator'
import { NodeEnv } from '@diut/common'

export class AppConfig {
  @IsNumber()
  HTTP_PORT: number

  @IsString()
  @MinLength(3)
  APP_SERVICE_NAME: string

  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv
}

export const loadAppConfig = makeConfigLoader(AppConfig)
