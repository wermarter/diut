import { Module } from '@nestjs/common'

import { ConfigModule } from './config'
import { LogModule } from './log'
import { MetricModule } from './metric'

@Module({
  imports: [ConfigModule, LogModule, MetricModule],
})
export class CoreModule {}
