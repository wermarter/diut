import { makeConfigLoader } from '@diut/nestjs-core'
import { IsEnum, IsNumber, IsString, MinLength } from 'class-validator'
import { NodeEnv } from '@diut/common'
import { registerAs } from '@nestjs/config'
import { Expose } from 'class-transformer'

export class AppConfig {
  @Expose()
  @IsNumber()
  GRPC_PORT: number

  @Expose()
  @IsString()
  @MinLength(3)
  SERVICE_NAME: string

  @Expose()
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv
}

export const loadAppConfig = makeConfigLoader(AppConfig)
