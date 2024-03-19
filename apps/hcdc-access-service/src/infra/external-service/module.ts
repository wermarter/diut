import { concatModuleMetadata } from '@diut/nestjs-infra'

import { browserServiceMetadata } from './browser-service'

export const externalServiceMetadata = concatModuleMetadata([
  browserServiceMetadata,
])
