import { ConfigModule } from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'

import { loadAppConfig } from './app'
import { loadLogConfig } from './log'
import { loadPuppeteerConfig } from './puppeteer'

export const configMetadata: ModuleMetadata = {
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadAppConfig, loadLogConfig, loadPuppeteerConfig],
    }),
  ],
}
