import { makeConfigLoader } from '@diut/nestjs-infra'
import { IsEnum, IsNumber, IsString, MinLength } from 'class-validator'
import { NodeEnv } from '@diut/common'
import { Expose } from 'class-transformer'

export class AppConfig {
  @Expose()
  @IsNumber()
  GRPC_PORT: number

  @Expose()
  @MinLength(3)
  @IsString()
  SERVICE_NAME: string

  @Expose()
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv
}

export const loadAppConfig = makeConfigLoader(AppConfig)
