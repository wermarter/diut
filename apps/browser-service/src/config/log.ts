import { makeConfigLoader } from '@diut/nestjs-infra'
import { Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class LogConfig {
  @Expose()
  @IsString()
  @IsOptional()
  LOKI_URL?: string
}

export const loadLogConfig = makeConfigLoader(LogConfig)
