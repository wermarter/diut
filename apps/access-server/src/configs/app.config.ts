import { registerAs } from '@nestjs/config'
import { makeConfigLoader } from '@diut/server-core'
import { IsString, MinLength } from 'class-validator'

export class AppConfig {
  @IsString()
  @MinLength(3)
  APP_SERVICE_NAME: string
}

export const loadServiceConfig = makeConfigLoader(AppConfig)
