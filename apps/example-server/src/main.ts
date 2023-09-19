import { LogBootstrap, SwaggerBootstrap, bootstrapApp } from '@diut/server-core'

import { AppModule } from './app.module'

bootstrapApp({ serviceName: 'example-server' }, AppModule, [
  LogBootstrap,
  SwaggerBootstrap,
])
