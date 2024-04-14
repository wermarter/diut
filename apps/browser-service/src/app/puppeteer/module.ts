import { ModuleMetadata } from '@nestjs/common'

import { PuppeteerCreatePDFUseCase } from './use-case/create-pdf'

export const puppeteerMetadata: ModuleMetadata = {
  providers: [PuppeteerCreatePDFUseCase],
}
