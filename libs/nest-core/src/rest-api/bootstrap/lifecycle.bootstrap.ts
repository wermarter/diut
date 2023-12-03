import { BootstrapConfig } from '../../bootstrap'

export const LifecycleBootstrap: BootstrapConfig = {
  afterInit(ctx) {
    ctx.app.enableShutdownHooks()
  },
}
