import { BootstrapConfig } from 'src/bootstrap'

export const CorsBootstrap: BootstrapConfig = {
  afterInit(ctx) {
    ctx.app.enableCors({ exposedHeaders: 'Content-Disposition' })
  },
}
