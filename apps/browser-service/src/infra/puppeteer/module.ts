import {
  concatModuleMetadata,
  getPuppeteerServiceToken,
  PuppeteerModule,
  PuppeteerService,
} from '@diut/nestjs-infra'
import { loadPuppeteerConfig, PuppeteerConfig } from 'src/config'
import { IPuppeteerService, PUPPETEER_SERVICE_TOKEN } from 'src/domain'

export const puppeteerMetadata = concatModuleMetadata([
  {
    imports: [
      PuppeteerModule.registerAsync({
        inject: [loadPuppeteerConfig.KEY],
        useFactory: async (config: PuppeteerConfig) => ({
          executablePath: config.CHROMIUM_PATH,
        }),
      }),
    ],
    providers: [
      {
        provide: PUPPETEER_SERVICE_TOKEN,
        inject: [getPuppeteerServiceToken()],
        useFactory(service: PuppeteerService) {
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
