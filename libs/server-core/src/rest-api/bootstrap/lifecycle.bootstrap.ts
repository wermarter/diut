import { BootstrapConfig } from 'src/bootstrap'

export const LifecycleBootstrap: BootstrapConfig = {
  afterInit(ctx) {
    ctx.app.enableShutdownHooks()
  },
}
