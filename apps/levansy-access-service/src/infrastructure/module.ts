import { concatModuleMetadata } from '@diut/nest-core'

import { mongoMetadata } from './mongo'
import { configMetadata } from './config'
import { logMetadata } from './log'
import { puppeteerServiceMetadata } from './puppeteer-service'
import { minioServiceMetadata } from './minio'

export const infrastructureMetadata = concatModuleMetadata([
  configMetadata,
  logMetadata,
  mongoMetadata,
  puppeteerServiceMetadata,
  minioServiceMetadata,
])
