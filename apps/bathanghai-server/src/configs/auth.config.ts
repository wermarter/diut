import { makeConfigLoader } from '@diut/server-core'
import { IsNotEmpty, IsString } from 'class-validator'

export class AuthConfig {
  @IsString()
  @IsNotEmpty()
  AUTH_JWT_SECRET: string

  @IsString()
  @IsNotEmpty()
  AUTH_JWT_EXPIRES_IN: string
}

export const loadAuthConfig = makeConfigLoader(AuthConfig)
