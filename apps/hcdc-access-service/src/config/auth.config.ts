import { makeConfigLoader } from '@diut/nestjs-core'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator'

export class AuthConfig {
  @Expose()
  @IsString()
  @IsNotEmpty()
  AUTH_JWT_SECRET: string

  @Expose()
  @IsNumberString()
  @IsNotEmpty()
  AUTH_JWT_EXPIRE_SECONDS: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  COOKIE_SECRET: string
}

export const loadAuthConfig = makeConfigLoader(AuthConfig)
