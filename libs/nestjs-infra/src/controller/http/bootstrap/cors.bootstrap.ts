import { NodeEnv } from '@diut/common'
import { INestApplication } from '@nestjs/common'
import { BootstrapConfig } from '../../../core/bootstrap'

export const CorsBootstrap = (config: {
  originAllowList: string[]
  localOriginAllowList: string[]
}): BootstrapConfig<INestApplication> => {
  return {
    afterInit(ctx) {
      const corsOriginAllowList = config.originAllowList

      if (ctx.nodeEnv === NodeEnv.Local) {
        corsOriginAllowList.push(...config.localOriginAllowList)
      }

      ctx.app.enableCors({
        exposedHeaders: 'Content-Disposition',
        credentials: true,
        origin: corsOriginAllowList,
      })
    },
  }
}
