import { makeConfigLoader } from '@diut/nestjs-infra'
import { Expose } from 'class-transformer'
import { IsOptional, IsUrl } from 'class-validator'

export class TelemetryConfig {
  @Expose()
  @IsUrl()
  @IsOptional()
  TRACE_OTLP_URL?: string
}

export const loadTelemetryConfig = makeConfigLoader(TelemetryConfig)
