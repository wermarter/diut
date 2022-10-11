import { IsNotEmpty, IsString } from 'class-validator'

export const AUTH_CONFIG_NAME = 'auth'

export class AuthConfig {
  @IsString()
  @IsNotEmpty()
  jwtSecret: string

  @IsString()
  @IsNotEmpty()
  expiresIn: string
}
