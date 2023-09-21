import {
  CorsBootstrap,
  HttpListenBootstrap,
  InterceptorBootstrap,
  LifecycleBootstrap,
  LogBootstrap,
  OtelBootstrap,
  PipeBootstrap,
  PrefixBootstrap,
  SwaggerBootstrap,
  bootstrapApp,
} from '@diut/server-core'

import { AppModule } from './app.module'

bootstrapApp({ serviceName: 'bathanghai-server' }, AppModule, [
  OtelBootstrap,
  LogBootstrap,
  CorsBootstrap,
  InterceptorBootstrap,
  LifecycleBootstrap,
  PipeBootstrap,
  PrefixBootstrap,
  SwaggerBootstrap,
  HttpListenBootstrap,
])
