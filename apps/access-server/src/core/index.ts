export * from './bootstrap'
export * from './config'
export * from './log'
export * from './open-telemetry'
export * from './http-server'

import { ConfigModule } from './config'
import { LogModule } from './log'
import { HttpServerModule } from './http-server'
import { AppOpenTelemetryModule } from './open-telemetry'

export const coreModules = [
  ConfigModule,
  LogModule,
  AppOpenTelemetryModule,
  HttpServerModule,
]
