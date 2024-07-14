Error.stackTraceLimit = Infinity

import {
  CookieBootstrap,
  CorsBootstrap,
  HttpListenBootstrap,
  LifecycleBootstrap,
  LogBootstrap,
  PipeBootstrap,
  PrefixBootstrap,
  SwaggerBootstrap,
  bootstrapApp,
} from '@diut/nestjs-infra'
import * as dotenv from 'dotenv'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

dotenv.config()

bootstrapApp(
  (AppModule, options) =>
    NestFactory.create(AppModule, { ...options, forceCloseConnections: true }),
  AppModule,
  {
    serviceName: process.env.SERVICE_NAME,
    nodeEnv: process.env.NODE_ENV,
  },
  [
    LogBootstrap,
    CorsBootstrap({
      devOriginAllowList: ['http://localhost:5173'],
      originAllowList: [],
    }),
    LifecycleBootstrap,
    PipeBootstrap,
    PrefixBootstrap,
    SwaggerBootstrap,
    CookieBootstrap(),
    HttpListenBootstrap(process.env.HTTP_PORT),
  ],
)
