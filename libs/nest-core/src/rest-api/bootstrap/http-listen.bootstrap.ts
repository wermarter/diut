import { NodeEnv } from '@diut/common'
import { INestApplication, Logger } from '@nestjs/common'

import { BootstrapConfig } from '../../bootstrap'
import { ConfigurationException } from '../../config'
import { SWAGGER_ENDPOINT } from '../constants'

const BOOTSTRAP_CONTEXT = 'Bootstrap'

export const HttpListenBootstrap: BootstrapConfig<INestApplication> = {
  async afterInit(ctx) {
    const logger = new Logger(BOOTSTRAP_CONTEXT)

    const port = parseInt(ctx.HTTP_PORT)
    if (isNaN(port) || port < 0 || port > 65535)
      throw new ConfigurationException(`Invalid port ${port}`)

    const isDev = ctx.NODE_ENV === NodeEnv.Development
    if (isDev) {
      logger.warn('Running in Development mode!')
    }

    await ctx.app.listen(port)
    logger.log(`Documentation at ${await ctx.app.getUrl()}/${SWAGGER_ENDPOINT}`)
  },
}
