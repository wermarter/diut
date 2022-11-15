import { Module } from '@nestjs/common'

import { AppSettingController } from './app-setting.controller'
import { AppSettingService } from './app-setting.service'

@Module({
  providers: [AppSettingService],
  controllers: [AppSettingController],
  exports: [AppSettingService],
})
export class AppSettingModule {}
