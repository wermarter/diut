export * from './bootstrap'
export * from './config'
export * from './log'
export * from './metric'
export * from './http-server'

import { HealthModule } from './http-server'
import { ConfigModule } from './config'
import { LogModule } from './log'
import { MetricModule } from './metric'

export const coreModules = [HealthModule, ConfigModule, LogModule, MetricModule]
