import { Module } from '@nestjs/common'

import { coreModules } from './core'
import { clientModules } from './clients'
import { resourceModules } from './resources'
import { AuthModule } from './auth'

@Module({
  imports: [...coreModules, ...clientModules, ...resourceModules, AuthModule],
})
export class AppModule {}
