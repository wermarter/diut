import { IsString } from 'class-validator'

export const LOG_CONFIG_NAME = 'log'

export class LogConfig {
  @IsString()
  level: string
}
