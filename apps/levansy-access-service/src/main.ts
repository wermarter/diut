import {
  CorsBootstrap,
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
  {
    serviceName: process.env.SERVICE_NAME,
    NODE_ENV: process.env.NODE_ENV,
    HTTP_PORT: process.env.HTTP_PORT,
  },
  AppModule,
  [
    LogBootstrap,
    CorsBootstrap,
    InterceptorBootstrap,
    LifecycleBootstrap,
    PipeBootstrap,
    PrefixBootstrap,
    SwaggerBootstrap,
    HttpListenBootstrap,
  ],
)
