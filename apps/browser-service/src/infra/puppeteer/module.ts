import { ModuleMetadata } from '@nestjs/common'
import { PuppeteerServiceToken } from 'src/domain'

import { PuppeteerService } from './service'

export const puppeteerMetadata: ModuleMetadata = {
  providers: [
    {
      provide: PuppeteerServiceToken,
      useClass: PuppeteerService,
    },
  ],
}
