import { LoggerService } from '@nestjs/common'

import { BootstrapConfig } from '../bootstrap'
import { getPinoNestjsLoggerToken } from './common'

export const PinoBootstrapFactory = (instanceId?: string): BootstrapConfig => ({
  initOptions: { bufferLogs: true },
  afterInit(ctx) {
    const logger: LoggerService = ctx.app.get(
      getPinoNestjsLoggerToken(instanceId),
    )

    ctx.app.useLogger(logger)
    ctx.app.flushLogs()
  },
})
