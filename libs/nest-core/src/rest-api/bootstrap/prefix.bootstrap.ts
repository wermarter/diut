import { INestApplication } from '@nestjs/common'

import { BootstrapConfig } from '../../bootstrap'
import { API_PREFIX } from '../constants'

export const PrefixBootstrap: BootstrapConfig<INestApplication> = {
  afterInit(ctx) {
    ctx.app.setGlobalPrefix(API_PREFIX)
  },
}
