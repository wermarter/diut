import { registerAs } from '@nestjs/config'
import { makeConfigLoader } from '@diut/server-core'
import { IsString, MinLength } from 'class-validator'

export class ServiceConfig {
  @IsString()
  @MinLength(3)
  SERVICE_NAME: string
}

export const loadServiceConfig = makeConfigLoader(ServiceConfig)
