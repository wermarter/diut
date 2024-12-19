import { concatModuleMetadata } from '@diut/nestjs-infra'
import { pdfMetadata } from './pdf'
import { pinoMetadata } from './pino'
import { puppeteerMetadata } from './puppeteer'

export const infraMetadata = concatModuleMetadata([
  pinoMetadata,
  puppeteerMetadata,
  pdfMetadata,
])
