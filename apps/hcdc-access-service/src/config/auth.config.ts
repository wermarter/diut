import { makeConfigLoader } from '@diut/nestjs-infra'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AuthConfig {
  @Expose()
  @IsString()
  @IsNotEmpty()
  AUTH_JWT_SECRET: string

  @Expose()
  @IsNumber()
  AUTH_JWT_EXPIRE_SECONDS: number

  @Expose()
  @IsString()
  @IsNotEmpty()
  COOKIE_SECRET: string
}

export const loadAuthConfig = makeConfigLoader(AuthConfig)
