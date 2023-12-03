import { NodeEnv } from '@diut/common'
import { INestMicroservice, Logger } from '@nestjs/common'

import { BootstrapConfig } from '../../bootstrap'

const BOOTSTRAP_CONTEXT = 'GrpcBootstrap'

export const GrpcListenBootstrap: BootstrapConfig<INestMicroservice> = {
  async afterInit(ctx) {
    const logger = new Logger(BOOTSTRAP_CONTEXT)

    const isDev = ctx.nodeEnv === NodeEnv.Development
    if (isDev) {
      logger.warn('Running in Development mode!')
    }

    await ctx.app.listen()
  },
}
