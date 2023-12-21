import { concatModuleMetadata } from '@diut/nest-core'

import { httpControllerV1Metadata } from './v1'

export const httpControllerMetadata = concatModuleMetadata([
  httpControllerV1Metadata,
])
