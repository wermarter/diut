import { concatModuleMetadata } from '@diut/nest-core'

import { mongoMetadata } from './mongo'
import { configMetadata } from './config'
import { logMetadata } from './log'
import { puppeteerServiceMetadata } from './puppeteer-service'

export const infrastructureMetadata = concatModuleMetadata([
  configMetadata,
  logMetadata,
  mongoMetadata,
  puppeteerServiceMetadata,
])
