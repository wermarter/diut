// import { registerAs } from '@nestjs/config'
import { makeConfigLoader } from '@diut/server-core'
import { IsEnum, IsString, MinLength } from 'class-validator'
import { NodeEnv } from '@diut/common'

export class AppConfig {
  @IsString()
  @MinLength(3)
  APP_SERVICE_NAME: string

  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv
}

export const loadAppConfig = makeConfigLoader(AppConfig)
