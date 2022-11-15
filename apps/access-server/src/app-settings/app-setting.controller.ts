import { Body, Logger } from '@nestjs/common'

import { AppController, AppRoute } from 'src/core'
import {
  GetAppSettingRequestDto,
  SetAppSettingRequestDto,
} from './app-setting.dtos'
import { appSettingRoutes } from './app-setting.routes'
import { AppSettingService } from './app-setting.service'

@AppController(appSettingRoutes.controller)
export class AppSettingController {
  private logger: Logger

  constructor(private appSettingService: AppSettingService) {
    this.logger = new Logger(AppSettingController.name)
  }

  @AppRoute(appSettingRoutes.getSetting)
  get(@Body() body: GetAppSettingRequestDto) {
    return this.appSettingService.get(body.setting)
  }

  @AppRoute(appSettingRoutes.setSetting)
  set(@Body() body: SetAppSettingRequestDto) {
    return this.appSettingService.set(body.setting, body.value)
  }

  @AppRoute(appSettingRoutes.deleteSetting)
  delete(@Body() body: GetAppSettingRequestDto) {
    return this.appSettingService.delete(body.setting)
  }
}
