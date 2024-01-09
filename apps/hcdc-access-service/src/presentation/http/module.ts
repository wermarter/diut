import { concatModuleMetadata } from '@diut/nest-core'

import { httpControllerV1Metadata } from './v1'
import { authMetadata } from './common'

export const httpControllerMetadata = concatModuleMetadata([
  authMetadata,
  httpControllerV1Metadata,
])
