import { NestFactory } from '@nestjs/core'
import { INestMicroservice } from '@nestjs/common'
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices'

import { bootstrapApp } from '../../../bootstrap'

export const GrpcAppFactory: (
  listenUrl: string,
  packageName: string,
  protoPath: string,
  grpcOptions?: Partial<GrpcOptions['options']>,
) => Parameters<typeof bootstrapApp<INestMicroservice>>[0] =
  (listenUrl, packageName, protoPath, grpcOptions) => (AppModule, options) =>
    NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      ...options,
      transport: Transport.GRPC,
      options: {
        ...grpcOptions,
        url: listenUrl,
        package: packageName,
        protoPath,
      },
    })
