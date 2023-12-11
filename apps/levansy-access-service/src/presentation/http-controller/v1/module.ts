import { concatModuleMetadata } from '@diut/nest-core'

import { v1BioProductMetadata } from './bio-product'

export const httpControllerV1Metadata = concatModuleMetadata([
  v1BioProductMetadata,
])
