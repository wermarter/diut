import {
  GrpcAppFactory,
  LifecycleBootstrap,
  LogBootstrap,
  bootstrapApp,
  DIUT_PACKAGE_NAME,
  resolveProtoPath,
  ProtobufService,
} from '@diut/nest-core'
import * as dotenv from 'dotenv'
import { INestMicroservice } from '@nestjs/common'

import { AppModule } from './app.module'

dotenv.config()

bootstrapApp<INestMicroservice>(
  GrpcAppFactory(
    `0.0.0.0:${process.env.GRPC_PORT}`,
    DIUT_PACKAGE_NAME,
    resolveProtoPath(ProtobufService.Puppeteer),
  ),
  AppModule,
  { serviceName: process.env.SERVICE_NAME, nodeEnv: process.env.NODE_ENV },
  [
    LogBootstrap,
    LifecycleBootstrap,
    {
      async afterInit(ctx) {
        await ctx.app.listen()
      },
    },
  ],
)
