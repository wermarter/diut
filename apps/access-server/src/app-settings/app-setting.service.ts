import { AppSetting } from '@diut/common'
import { Injectable, Logger } from '@nestjs/common'

import { CacheService } from 'src/clients/redis-cache'

const APP_SETTING_NAMESPACE = 'appSetting'

@Injectable()
export class AppSettingService {
  private logger: Logger

  constructor(private readonly cacheService: CacheService) {
    this.logger = new Logger(AppSettingService.name)
  }

  get<T = unknown>(setting: AppSetting) {
    return this.cacheService.getValue<T>(setting, APP_SETTING_NAMESPACE)
  }

  set(setting: AppSetting, value: unknown) {
    return this.cacheService.setValue(
      setting,
      value,
      undefined, // permanent key
      APP_SETTING_NAMESPACE
    )
  }

  delete(setting: AppSetting) {
    return this.cacheService.deleteKey(setting, APP_SETTING_NAMESPACE)
  }
}
