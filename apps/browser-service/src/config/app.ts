import { NodeEnv } from '@diut/common'
import { makeConfigLoader } from '@diut/nestjs-infra'
import { Expose } from 'class-transformer'
import { IsEnum, IsNumber, IsString, MinLength } from 'class-validator'

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
