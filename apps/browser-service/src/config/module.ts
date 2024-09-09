import { ConfigModule } from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'

import { loadAppConfig } from './app'
import { loadPuppeteerConfig } from './puppeteer'
import { loadTelemetryConfig } from './telemetry'

export const configMetadata: ModuleMetadata = {
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadAppConfig, loadPuppeteerConfig, loadTelemetryConfig],
    }),
  ],
}
