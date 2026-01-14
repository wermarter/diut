import 'reflect-metadata'
import './otel'
//
import {
  HttpListenBootstrap,
  LifecycleBootstrap,
  PinoBootstrapFactory,
  PrefixBootstrap,
  bootstrapApp,
} from '@diut/nestjs-infra'
import {
  DIUT_PACKAGE_NAME,
  DiutGrpcService,
  resolveProtoPath,
} from '@diut/services'
import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import * as dotenv from 'dotenv'
import { AppModule } from './app.module'

dotenv.config()

bootstrapApp<INestApplication>(
  (AppModule, options) => NestFactory.create(AppModule, options),
  AppModule,
  { serviceName: process.env.SERVICE_NAME, nodeEnv: process.env.NODE_ENV },
  [
    PinoBootstrapFactory(),
    LifecycleBootstrap,
    {
      async afterInit(ctx) {
        ctx.app.connectMicroservice<MicroserviceOptions>({
          transport: Transport.GRPC,
          options: {
            url: `0.0.0.0:${process.env.GRPC_PORT}`,
            package: DIUT_PACKAGE_NAME,
            protoPath: resolveProtoPath(DiutGrpcService.Browser, __dirname),
            maxReceiveMessageLength: 20_000_000,
          },
        })

        await ctx.app.startAllMicroservices()
      },
    },
    PrefixBootstrap,
    HttpListenBootstrap(process.env.HTTP_PORT),
  ],
)
