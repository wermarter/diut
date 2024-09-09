import { BootstrapConfig } from '../../../core/bootstrap'

export const LifecycleBootstrap: BootstrapConfig = {
  afterInit(ctx) {
    ctx.app.enableShutdownHooks()
  },
}
