import { Module } from '@nestjs/common'

import { coreModules } from './core'
import { clientModules } from './clients'
import { resourceModules } from './resources'

@Module({
  imports: [...coreModules, ...clientModules, ...resourceModules],
})
export class AppModule {}
