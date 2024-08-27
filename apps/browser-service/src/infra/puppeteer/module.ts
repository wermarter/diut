import {
  PuppeteerClientModule,
  concatModuleMetadata,
  PuppeteerClientService,
  getPuppeteerClientServiceToken,
} from '@diut/nestjs-infra'

import { loadPuppeteerConfig, PuppeteerConfig } from 'src/config'
import { IPuppeteerService, PUPPETEER_SERVICE_TOKEN } from 'src/domain'

export const puppeteerMetadata = concatModuleMetadata([
  {
    imports: [
      PuppeteerClientModule.registerAsync({
        inject: [loadPuppeteerConfig.KEY],
        useFactory: async (config: PuppeteerConfig) => ({
          executablePath: config.CHROMIUM_PATH,
        }),
      }),
    ],
    providers: [
      {
        provide: PUPPETEER_SERVICE_TOKEN,
        inject: [getPuppeteerClientServiceToken()],
        useFactory(service: PuppeteerClientService) {
          return {
            getBrowser() {
              return service.browser
            },
          } satisfies IPuppeteerService
        },
      },
    ],
  },
])
