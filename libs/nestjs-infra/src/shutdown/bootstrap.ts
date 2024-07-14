import { BootstrapConfig } from '../bootstrap'
import { ShutdownService } from './service'

export const ShutdownBootstrap: BootstrapConfig = {
  afterInit(ctx) {
    const shutdownService: ShutdownService = ctx.app.get(ShutdownService)
    if (shutdownService === undefined) {
      console.log('ShutdownService missing')
    }

    shutdownService.subscribeToShutdown(() => ctx.app.close())
  },
}
