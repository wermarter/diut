import { INestApplication } from '@nestjs/common'

import { BootstrapConfig } from '../../bootstrap'
import { HttpLoggerInterceptor } from '../interceptors'

export const InterceptorBootstrap: BootstrapConfig<INestApplication> = {
  afterInit(ctx) {
    ctx.app.useGlobalInterceptors(new HttpLoggerInterceptor())
  },
}
