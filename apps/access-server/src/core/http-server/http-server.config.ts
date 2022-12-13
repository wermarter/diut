import { Type } from 'class-transformer'
import { IsNumber } from 'class-validator'

export const HTTP_SERVER_CONFIG_NAME = 'httpServer'

export class HttpServerConfig {
  @Type(() => Number)
  @IsNumber()
  port = 5000
}
