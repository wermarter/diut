import { ModuleMetadata } from '@nestjs/common'
import { ClassConstructor } from 'class-transformer'

import { IPuppeteerService, PuppeteerServiceToken } from 'src/domain'
import { PuppeteerService } from './service'

export const puppeteerMetadata: ModuleMetadata = {
  providers: [
    {
      provide: PuppeteerServiceToken,
      useClass: PuppeteerService satisfies ClassConstructor<IPuppeteerService>,
    },
  ],
}
