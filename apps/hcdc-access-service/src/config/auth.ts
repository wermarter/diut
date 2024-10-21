import { makeConfigLoader } from '@diut/nestjs-infra'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AuthConfig {
  @Expose()
  @IsString()
  @IsNotEmpty()
  AUTH_JWT_ACCESS_TOKEN_SECRET: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  AUTH_JWT_REFRESH_TOKEN_SECRET: string

  @Expose()
  @IsNumber()
  AUTH_JWT_ACCESS_TOKEN_EXPIRE_SECONDS: number

  @Expose()
  @IsNumber()
  AUTH_JWT_REFRESH_TOKEN_EXPIRE_SECONDS: number
}

export const loadAuthConfig = makeConfigLoader(AuthConfig)
