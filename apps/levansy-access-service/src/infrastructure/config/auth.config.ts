import { makeConfigLoader } from '@diut/nest-core'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

import { IAuthConfig } from 'src/domain'

export class AuthConfig implements IAuthConfig {
  @Expose()
  @IsString()
  @IsNotEmpty()
  AUTH_JWT_SECRET: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  AUTH_JWT_EXPIRES_IN: string
}

export const loadAuthConfig = makeConfigLoader(AuthConfig)
