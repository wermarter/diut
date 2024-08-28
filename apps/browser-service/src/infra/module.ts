import { concatModuleMetadata } from '@diut/nestjs-infra'

import { pdfMetadata } from './pdf'
import { puppeteerMetadata } from './puppeteer'
import { winstonMetadata } from './winston'

export const infraMetadata = concatModuleMetadata([
  winstonMetadata,
  puppeteerMetadata,
  pdfMetadata,
])
