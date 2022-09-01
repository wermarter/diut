export * from './bootstrap'
export * from './config'
export * from './log'
export * from './metric'

import { ConfigModule } from './config'
import { LogModule } from './log'
import { MetricModule } from './metric'

export const coreModules = [ConfigModule, LogModule, MetricModule]
