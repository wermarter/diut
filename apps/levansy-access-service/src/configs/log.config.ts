import { makeConfigLoader } from '@diut/nest-core'
import { IsOptional, IsString } from 'class-validator'

export class LogConfig {
  @IsOptional()
  @IsString()
  LOKI_URL?: string
}

export const loadLogConfig = makeConfigLoader(LogConfig)
