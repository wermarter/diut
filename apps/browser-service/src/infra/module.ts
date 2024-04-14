import { concatModuleMetadata } from '@diut/nestjs-infra'

import { logMetadata } from './log'
import { puppeteerMetadata } from './puppeteer'
import { pdfMetadata } from './pdf'

export const infraMetadata = concatModuleMetadata([
  logMetadata,
  puppeteerMetadata,
  pdfMetadata,
])
