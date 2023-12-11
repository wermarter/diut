import { concatModuleMetadata } from '@diut/nest-core'

import { httpControllerMetadata } from './http-controller'

export const presentationMetadata = concatModuleMetadata([
  httpControllerMetadata,
])
