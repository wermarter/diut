import { IsNumberString } from 'class-validator'

export const HTTP_SERVER_CONFIG_NAME = 'httpServer'

export class HttpServerConfig {
  @IsNumberString()
  port = '5000'
}
