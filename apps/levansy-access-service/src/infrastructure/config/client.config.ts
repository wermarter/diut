import { makeConfigLoader } from '@diut/nest-core'
import { Expose } from 'class-transformer'
import { IsString, MinLength } from 'class-validator'
import { registerAs } from '@nestjs/config'

export class ClientConfig {
  @Expose()
  @IsString()
  @MinLength(3)
  PUPPETEER_SERVICE_URL: string
}

export const loadClientConfig = makeConfigLoader(ClientConfig)
