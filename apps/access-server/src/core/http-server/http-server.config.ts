import { IsNumber } from 'class-validator'

export const HTTP_SERVER_CONFIG_NAME = 'httpServer'

export class HttpServerConfig {
  @IsNumber()
  port = 5000
}
