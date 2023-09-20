import { BootstrapConfig } from '../../bootstrap'
import { API_PREFIX } from '../constants'

export const PrefixBootstrap: BootstrapConfig = {
  afterInit(ctx) {
    ctx.app.setGlobalPrefix(API_PREFIX)
  },
}
