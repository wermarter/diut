import {
  ConfigModule,
  PuppeteerClientModule,
  concatModuleMetadata,
  PuppeteerClientService,
  getPuppeteerClientServiceToken,
} from '@diut/nestjs-infra'

import { loadPuppeteerConfig, PuppeteerConfig } from 'src/config'
import { IPuppeteerService, PuppeteerServiceToken } from 'src/domain'

export const puppeteerMetadata = concatModuleMetadata([
  {
    imports: [
      PuppeteerClientModule.registerAsync({
        imports: [ConfigModule.forFeature(loadPuppeteerConfig)],
        inject: [loadPuppeteerConfig.KEY],
        useFactory: async (config: PuppeteerConfig) => ({
          executablePath: config.CHROMIUM_PATH,
        }),
      }),
    ],
    providers: [
      {
        provide: PuppeteerServiceToken,
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
