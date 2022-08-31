import { IsBoolean, IsOptional } from 'class-validator'

export class LogConfig {
  @IsBoolean()
  @IsOptional()
  console = true
}
