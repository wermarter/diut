import { makeConfigLoader } from '@diut/nest-core'
import { IsString, MinLength } from 'class-validator'

export class ClientConfig {
  @IsString()
  @MinLength(3)
  PUPPETEER_SERVICE_URL: string
}

export const loadClientConfig = makeConfigLoader(ClientConfig)
