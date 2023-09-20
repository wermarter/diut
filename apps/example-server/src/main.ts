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

import { AppModule } from './app.module'

bootstrapApp({ serviceName: 'example-server' }, AppModule, [
  LogBootstrap,
  CorsBootstrap,
  InterceptorBootstrap,
  LifecycleBootstrap,
  PipeBootstrap,
  PrefixBootstrap,
  SwaggerBootstrap,
  HttpListenBootstrap,
])
