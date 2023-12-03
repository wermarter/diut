import { makeConfigLoader } from '@diut/nest-core'
import { IsOptional, IsString } from 'class-validator'
import { registerAs } from '@nestjs/config'

export class LogConfig {
  @IsOptional()
  @IsString()
  LOKI_URL?: string
}

export const loadLogConfig = makeConfigLoader(LogConfig)
