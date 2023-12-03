import { NestFactory } from '@nestjs/core'
import { INestMicroservice } from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { bootstrapApp } from '../../bootstrap'

export const GrpcAppFactory: (
  listenUrl: string,
  packageName: string,
  protoPath: string,
) => Parameters<typeof bootstrapApp<INestMicroservice>>[0] =
  (listenUrl, packageName, protoPath) => (AppModule, options) =>
    NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      ...options,
      transport: Transport.GRPC,
      options: {
        url: listenUrl, //`0.0.0.0:${process.env.GRPC_PORT}`,
        package: packageName, //PUPPETEER_SERVICE_PACKAGE_NAME,
        protoPath, //join(__dirname, 'protobuf/package.proto'),
      },
    })
