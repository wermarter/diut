import { LoggerService } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

import { BootstrapConfig } from '../bootstrap'

export const LogBootstrap: BootstrapConfig = {
  initOptions: { bufferLogs: true },
  afterInit(ctx) {
    const logger: LoggerService = ctx.app.get(WINSTON_MODULE_NEST_PROVIDER)
    ctx.app.useLogger(logger)
    ctx.app.flushLogs()
  },
}
