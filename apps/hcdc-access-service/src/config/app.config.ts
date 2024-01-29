import { makeConfigLoader } from '@diut/nestjs-core'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Expose } from 'class-transformer'
import { NodeEnv } from '@diut/common'

export class AppConfig {
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
