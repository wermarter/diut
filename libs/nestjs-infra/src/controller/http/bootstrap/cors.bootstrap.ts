import { NodeEnv } from '@diut/common'
import { INestApplication } from '@nestjs/common'
import { BootstrapConfig } from '../../../core/bootstrap'

export const CorsBootstrap = (config: {
  originAllowList: string[]
  devOriginAllowList: string[]
}): BootstrapConfig<INestApplication> => {
  return {
    afterInit(ctx) {
      const corsOriginAllowList = config.originAllowList

      if (ctx.nodeEnv === NodeEnv.Development) {
        corsOriginAllowList.push(...config.devOriginAllowList)
      }

      ctx.app.enableCors({
        exposedHeaders: 'Content-Disposition',
        credentials: true,
        origin: corsOriginAllowList,
      })
    },
  }
}
