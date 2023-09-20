import { ConfigService } from '@nestjs/config'
import { NodeEnv } from '@diut/common'
import { Logger } from '@nestjs/common'

import { BootstrapConfig } from '../../bootstrap'
import { ConfigurationException } from '../../config'
import { HTTP_PORT, NODE_ENV, SWAGGER_ENDPOINT } from '../constants'

const BOOTSTRAP_CONTEXT = 'Bootstrap'

export const HttpListenBootstrap: BootstrapConfig = {
  async afterInit(ctx) {
    const configService = ctx.app.get(ConfigService)
    const logger = new Logger(BOOTSTRAP_CONTEXT)

    const port = parseInt(configService.get<string>(HTTP_PORT))
    if (isNaN(port) || port < 0 || port > 65535)
      throw new ConfigurationException(`Invalid port ${port}`)

    const env = configService.get<string>(NODE_ENV)
    const isDev = env === NodeEnv.Development
    if (isDev) {
      logger.warn('Running in Development mode!')
    }

    await ctx.app.listen(port)
    logger.log(`Documentation at http://localhost:${port}/${SWAGGER_ENDPOINT}`)
  },
}
