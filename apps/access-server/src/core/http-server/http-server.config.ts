import { IsNumber } from 'class-validator'

export class HttpServerConfig {
  @IsNumber()
  port = 5000
}
