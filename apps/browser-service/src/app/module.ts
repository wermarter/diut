import { concatModuleMetadata } from '@diut/nestjs-infra'
import { browserMetadata } from './browser'
import { puppeteerMetadata } from './puppeteer'

export const appMetadata = concatModuleMetadata([
  puppeteerMetadata,
  browserMetadata,
])
