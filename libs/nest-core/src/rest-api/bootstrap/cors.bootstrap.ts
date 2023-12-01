import { INestApplication } from '@nestjs/common'

import { BootstrapConfig } from '../../bootstrap'

export const CorsBootstrap: BootstrapConfig<INestApplication> = {
  afterInit(ctx) {
    ctx.app.enableCors({
      exposedHeaders: 'Content-Disposition',
    })
  },
}
