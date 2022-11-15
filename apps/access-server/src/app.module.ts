import { Module } from '@nestjs/common'

import { coreModules } from './core'
import { clientModules } from './clients'
import { resourceModules } from './resources'
import { AuthModule } from './auth'
import { AppSettingModule } from './app-settings'

@Module({
  imports: [
    ...coreModules,
    ...clientModules,
    ...resourceModules,
    AuthModule,
    AppSettingModule,
  ],
})
export class AppModule {}
