import {
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
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

dotenv.config()

bootstrapApp<INestMicroservice>(
  (AppModule, options) =>
    NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      ...options,
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${process.env.GRPC_PORT}`,
        package: DIUT_PACKAGE_NAME,
        protoPath: resolveProtoPath(DiutGrpcService.Browser, __dirname),
        maxReceiveMessageLength: 20_000_000,
      },
    }),
  AppModule,
  { serviceName: process.env.SERVICE_NAME, nodeEnv: process.env.NODE_ENV },
  [LogBootstrap, LifecycleBootstrap, GrpcListenBootstrap],
)
