import { BootstrapConfig } from 'src/bootstrap'
import { HttpLoggerInterceptor } from '../interceptors'

export const InterceptorBootstrap: BootstrapConfig = {
  afterInit(ctx) {
    ctx.app.useGlobalInterceptors(new HttpLoggerInterceptor())
  },
}
