import {
  GrpcAppFactory,
  LifecycleBootstrap,
  LogBootstrap,
  bootstrapApp,
  GrpcListenBootstrap,
} from '@diut/nestjs-infra'
import {
  DiutGrpcService,
  resolveProtoPath,
  DIUT_PACKAGE_NAME,
} from '@diut/services'
import * as dotenv from 'dotenv'
import { INestMicroservice } from '@nestjs/common'

import { AppModule } from './app.module'

dotenv.config()

bootstrapApp<INestMicroservice>(
  GrpcAppFactory(
    `0.0.0.0:${process.env.GRPC_PORT}`,
    DIUT_PACKAGE_NAME,
    resolveProtoPath(DiutGrpcService.Example, __dirname),
  ),
  AppModule,
  { serviceName: process.env.SERVICE_NAME, nodeEnv: process.env.NODE_ENV },
  [LogBootstrap, LifecycleBootstrap, GrpcListenBootstrap],
)
