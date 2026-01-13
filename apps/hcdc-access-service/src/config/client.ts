import { makeConfigLoader } from '@diut/nestjs-infra'
import { Expose } from 'class-transformer'
import { IsString, MinLength } from 'class-validator'

export class ClientConfig {
  @Expose()
  @IsString()
  @MinLength(3)
  BROWSER_SERVICE_URL: string

  @Expose()
  @IsString()
  @MinLength(3)
  BROWSER_SERVICE_AUTHORITY: string
}

export const loadClientConfig = makeConfigLoader(ClientConfig)
