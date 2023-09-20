import { IsNumber, IsString } from 'class-validator'

export class OtelConfig {
  @IsNumber()
  PROMETHEUS_PORT = 8081

  @IsString()
  PROMETHEUS_ENDPOINT = '/metrics'

  @IsString()
  OTLP_TRACE_EXPORTER_URL = 'http://tempo:4318/v1/traces'
}
