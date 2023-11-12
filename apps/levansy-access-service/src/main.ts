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
} from '@diut/server-core'
import * as dotenv from 'dotenv'

import { AppModule } from './app.module'

dotenv.config()
bootstrapApp({ serviceName: process.env.SERVICE_NAME }, AppModule, [
  LogBootstrap,
  CorsBootstrap,
  InterceptorBootstrap,
  LifecycleBootstrap,
  PipeBootstrap,
  PrefixBootstrap,
  SwaggerBootstrap,
  HttpListenBootstrap,
])
