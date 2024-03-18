import { ConfigModule } from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'

import { loadAppConfig } from './app.config'
import { loadLogConfig } from './log.config'
import { loadPuppeteerConfig } from './puppeteer.config'

export const configMetadata: ModuleMetadata = {
  imports: [
    ConfigModule.forRoot({}),
    ConfigModule.forFeature(loadAppConfig),
    ConfigModule.forFeature(loadLogConfig),
    ConfigModule.forFeature(loadPuppeteerConfig),
  ],
}
