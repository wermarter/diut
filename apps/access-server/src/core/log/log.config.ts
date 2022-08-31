import { IsOptional, IsString } from 'class-validator'

export class LogConfig {
  @IsString()
  @IsOptional()
  level = 'info'
}
