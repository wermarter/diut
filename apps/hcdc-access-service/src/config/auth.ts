import { makeConfigLoader } from '@diut/nestjs-infra'
import { Expose, Type } from 'class-transformer'
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
  @Type(() => Number)
  @IsNumber()
  AUTH_JWT_ACCESS_TOKEN_EXPIRE_SECONDS: number

  @Expose()
  @Type(() => Number)
  @IsNumber()
  AUTH_JWT_REFRESH_TOKEN_EXPIRE_SECONDS: number
}

export const loadAuthConfig = makeConfigLoader(AuthConfig)
