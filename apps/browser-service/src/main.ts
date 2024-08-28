import {
  GrpcListenBootstrap,
  LifecycleBootstrap,
  LogBootstrap,
  bootstrapApp,
} from '@diut/nestjs-infra'
import {
  DIUT_PACKAGE_NAME,
  DiutGrpcService,
  resolveProtoPath,
} from '@diut/services'
import { INestMicroservice } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import * as dotenv from 'dotenv'

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
