import { NodeEnv } from '@diut/common'
import { INestApplication, Logger } from '@nestjs/common'

import { BootstrapConfig } from '../../../bootstrap'
import { ConfigurationException } from '../../../config'

const BOOTSTRAP_CONTEXT = 'HttpBootstrap'

export const HttpListenBootstrap: (
  httpPort?: string,
) => BootstrapConfig<INestApplication> = (httpPort) => ({
  async afterInit(ctx) {
    const logger = new Logger(BOOTSTRAP_CONTEXT)

    const port = parseInt(httpPort ?? '5000')
    if (isNaN(port) || port < 0 || port > 65535)
      throw new ConfigurationException(`Invalid port ${port}`)

    const isDev = ctx.nodeEnv === NodeEnv.Development
    if (isDev) {
      logger.warn('Running in Development mode!')
    }

    await ctx.app.listen(port)
    logger.log(`Listenning at ${await ctx.app.getUrl()}`)
  },
})
