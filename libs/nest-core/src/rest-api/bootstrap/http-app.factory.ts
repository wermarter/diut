import { NestFactory } from '@nestjs/core'
import { INestApplication } from '@nestjs/common'

import { bootstrapApp } from '../../bootstrap'

export const HttpAppFactory: Parameters<
  typeof bootstrapApp<INestApplication>
>[0] = (AppModule, options) =>
  NestFactory.create(AppModule, { ...options, forceCloseConnections: true })
