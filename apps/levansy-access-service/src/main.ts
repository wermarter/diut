import {
  CookieBootstrap,
  CorsBootstrap,
  HttpAppFactory,
  HttpListenBootstrap,
  InterceptorBootstrap,
  LifecycleBootstrap,
  LogBootstrap,
  PipeBootstrap,
  PrefixBootstrap,
  SwaggerBootstrap,
  bootstrapApp,
} from '@diut/nest-core'
import * as dotenv from 'dotenv'

import { AppModule } from './app.module'

dotenv.config()

bootstrapApp(
  HttpAppFactory,
  AppModule,
  {
    serviceName: 'process.env.SERVICE_NAME',
    nodeEnv: process.env.NODE_ENV,
  },
  [
    LogBootstrap,
    CorsBootstrap,
    InterceptorBootstrap,
    LifecycleBootstrap,
    PipeBootstrap,
    PrefixBootstrap,
    SwaggerBootstrap,
    CookieBootstrap(process.env.COOKIE_SECRET),
    HttpListenBootstrap(process.env.HTTP_PORT),
  ],
)
