import { concatModuleMetadata } from '@diut/nestjs-infra'

import { exampleServiceMetadata } from './example-service'

export const externalServiceMetadata = concatModuleMetadata([
  exampleServiceMetadata,
])
