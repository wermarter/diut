import { concatModuleMetadata } from '@diut/nestjs-infra'

import { winstonMetadata } from './winston'
import { puppeteerMetadata } from './puppeteer'
import { pdfMetadata } from './pdf'

export const infraMetadata = concatModuleMetadata([
  winstonMetadata,
  puppeteerMetadata,
  pdfMetadata,
])
