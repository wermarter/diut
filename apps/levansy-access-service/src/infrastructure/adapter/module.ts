import { concatModuleMetadata } from '@diut/nest-core'

import { puppeteerServiceMetadata } from './puppeteer'
import { minioServiceMetadata } from './minio'
import { mongoMetadata } from './mongo'
import { logMetadata } from './log'

export const adapterMetadata = concatModuleMetadata([
  logMetadata,
  mongoMetadata,
  puppeteerServiceMetadata,
  minioServiceMetadata,
])
