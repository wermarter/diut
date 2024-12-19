import { INestApplication } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import { BootstrapConfig } from '../../../core/bootstrap'

export const CookieBootstrap = (
  cookieSecret?: string,
): BootstrapConfig<INestApplication> => ({
  afterInit(ctx) {
    ctx.app.use(cookieParser(cookieSecret))
  },
})
