import { concatModuleMetadata } from '@diut/nestjs-infra'

import { puppeteerMetadata } from './puppeteer'
import { browserMetadata } from './browser'

export const appMetadata = concatModuleMetadata([
  puppeteerMetadata,
  browserMetadata,
])
