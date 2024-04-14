Error.stackTraceLimit = Infinity

import {
  CookieBootstrap,
  CorsBootstrap,
  HttpAppFactory,
  HttpListenBootstrap,
  LifecycleBootstrap,
  LogBootstrap,
  PipeBootstrap,
  PrefixBootstrap,
  SwaggerBootstrap,
  bootstrapApp,
} from '@diut/nestjs-infra'
import * as dotenv from 'dotenv'

import { AppModule } from './app.module'

dotenv.config()

bootstrapApp(
  HttpAppFactory,
  AppModule,
  {
    serviceName: process.env.SERVICE_NAME,
    nodeEnv: process.env.NODE_ENV,
  },
  [
    LogBootstrap,
    CorsBootstrap({
      devOriginAllowList: ['http://localhost:5173'],
      originAllowList: ['http://lab.hcdc.vn:8000'],
    }),
    LifecycleBootstrap,
    PipeBootstrap,
    PrefixBootstrap,
    SwaggerBootstrap,
    CookieBootstrap(process.env.COOKIE_SECRET),
    HttpListenBootstrap(process.env.HTTP_PORT),
  ],
)
