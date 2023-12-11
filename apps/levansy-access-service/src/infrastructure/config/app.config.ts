import { makeConfigLoader } from '@diut/nest-core'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Expose } from 'class-transformer'
import { NodeEnv } from '@diut/common'

import { IAppConfig } from 'src/domain'

export class AppConfig implements IAppConfig {
  @Expose()
  @IsNumber()
  HTTP_PORT: number

  @Expose()
  @IsString()
  @IsNotEmpty()
  SERVICE_NAME: string

  @Expose()
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv
}

export const loadAppConfig = makeConfigLoader(AppConfig)
