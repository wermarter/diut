export * from './bootstrap'
export * from './config'
export * from './log'
export * from './metric'
export * from './http-server'

import { ConfigModule } from './config'
import { LogModule } from './log'
import { MetricModule } from './metric'
import { HttpServerModule } from './http-server'

export const coreModules = [
  ConfigModule,
  LogModule,
  MetricModule,
  HttpServerModule,
]
