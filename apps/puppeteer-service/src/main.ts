import { NestFactory } from '@nestjs/core'
import { LifecycleBootstrap, LogBootstrap, bootstrapApp } from '@diut/nest-core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import * as dotenv from 'dotenv'
import { ProtoPackage } from '@diut/common'
import { INestMicroservice } from '@nestjs/common'

import { AppModule } from './app.module'
import { join } from 'path'

dotenv.config()

bootstrapApp<INestMicroservice>(
  { serviceName: process.env.SERVICE_NAME, NODE_ENV: process.env.NODE_ENV },
  AppModule,
  [
    LogBootstrap,
    LifecycleBootstrap,
    {
      async afterInit(ctx) {
        await ctx.app.listen()
      },
    },
  ],
  (AppModule, additionalOptions) =>
    NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      ...additionalOptions,
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        package: ProtoPackage.PuppeteerService,
        protoPath: join(__dirname, 'proto/package.proto'),
      },
    }),
)
