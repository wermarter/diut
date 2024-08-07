import { makeConfigLoader } from '@diut/nestjs-infra'
import { IsOptional, IsString } from 'class-validator'
import { Expose } from 'class-transformer'

export class LogConfig {
  @Expose()
  @IsOptional()
  @IsString()
  LOKI_URL?: string
}

export const loadLogConfig = makeConfigLoader(LogConfig)
