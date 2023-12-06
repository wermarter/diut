import { NestFactory } from '@nestjs/core'

import { bootstrapApp } from '../../bootstrap'

export const HttpAppFactory: Parameters<typeof bootstrapApp>[0] = (
  AppModule,
  options,
) => NestFactory.create(AppModule, { ...options, forceCloseConnections: true })
