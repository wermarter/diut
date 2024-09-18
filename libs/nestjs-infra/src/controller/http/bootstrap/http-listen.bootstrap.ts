import { NodeEnv } from '@diut/common'
import { INestApplication, Logger } from '@nestjs/common'
import { setTimeout } from 'timers/promises'

import { BootstrapConfig } from '../../../core/bootstrap'
import { ConfigurationException } from '../../../core/config'

const BOOTSTRAP_CONTEXT = 'HttpBootstrap'

export const HttpListenBootstrap: (
  httpPort?: string,
) => BootstrapConfig<INestApplication> = (httpPort) => ({
  async afterInit(ctx) {
    const logger = new Logger(BOOTSTRAP_CONTEXT)

    const isDev = ctx.nodeEnv === NodeEnv.Development
    if (isDev) {
      logger.warn('Running in Development mode!')
    }

    if (httpPort) {
      const port = parseInt(httpPort)
      if (isNaN(port) || port < 0 || port > 65535)
        throw new ConfigurationException(`Invalid port ${port}`)

      while (true) {
        try {
          await ctx.app.listen(port)
          break
        } catch {
          await setTimeout(1000)
        }
      }

      logger.log(`Successfully listenning at ${await ctx.app.getUrl()}`)
    } else {
      await ctx.app.init()
      logger.log(`App started`)
    }
  },
})
