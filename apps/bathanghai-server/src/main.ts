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
  // SERVER_CORE_TEST,
} from '@diut/server-core'
// import { COMMON_TEST } from '@diut/common'
// import { BATHANGHAI_COMMON } from '@diut/bathanghai-common'

import { AppModule } from './app.module'

// console.log({ COMMON_TEST, BATHANGHAI_COMMON, SERVER_CORE_TEST })

bootstrapApp({ serviceName: 'bathanghai-server' }, AppModule, [
  LogBootstrap,
  CorsBootstrap,
  InterceptorBootstrap,
  LifecycleBootstrap,
  PipeBootstrap,
  PrefixBootstrap,
  SwaggerBootstrap,
  HttpListenBootstrap,
])
