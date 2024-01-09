import { makeConfigLoader } from '@diut/nest-core'
import { Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class LogConfig {
  @Expose()
  @IsOptional()
  @IsString()
  LOKI_URL?: string
}

export const loadLogConfig = makeConfigLoader(LogConfig)
