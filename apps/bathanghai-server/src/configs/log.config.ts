// import { registerAs } from '@nestjs/config'
import { makeConfigLoader } from '@diut/server-core'
import { IsNotEmpty, IsString } from 'class-validator'

export class LogConfig {
  @IsString()
  @IsNotEmpty()
  LOKI_URL: string
}

export const loadLogConfig = makeConfigLoader(LogConfig)
