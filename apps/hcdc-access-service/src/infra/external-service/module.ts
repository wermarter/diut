import { concatModuleMetadata } from '@diut/nestjs-infra'

import { browserServiceMetadata } from './example-service'

export const externalServiceMetadata = concatModuleMetadata([
  browserServiceMetadata,
])
