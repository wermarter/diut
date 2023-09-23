// import { registerAs } from '@nestjs/config'
import { makeConfigLoader } from '@diut/server-core'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class LogConfig {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  LOKI_URL?: string
}

export const loadLogConfig = makeConfigLoader(LogConfig)
