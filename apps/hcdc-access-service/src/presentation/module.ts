import { concatModuleMetadata } from '@diut/nest-core'

import { httpControllerMetadata } from './http'

export const presentationMetadata = concatModuleMetadata([
  httpControllerMetadata,
])
