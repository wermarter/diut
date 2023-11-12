import { BootstrapConfig } from '../../bootstrap'

export const CorsBootstrap: BootstrapConfig = {
  afterInit(ctx) {
    ctx.app.enableCors({ exposedHeaders: 'Content-Disposition' })
  },
}
