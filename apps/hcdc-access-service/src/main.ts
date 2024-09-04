// Error.stackTraceLimit = Infinity
import './otel'

import {
  CookieBootstrap,
  CorsBootstrap,
  HttpListenBootstrap,
  LifecycleBootstrap,
  PinoBootstrapFactory,
  PipeBootstrap,
  PrefixBootstrap,
  SwaggerBootstrap,
  bootstrapApp,
} from '@diut/nestjs-infra'
import { NestFactory } from '@nestjs/core'
import * as dotenv from 'dotenv'

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
    PinoBootstrapFactory(),
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
