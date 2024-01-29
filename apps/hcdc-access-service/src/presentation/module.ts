import { concatModuleMetadata } from '@diut/nestjs-core'

import { httpControllerMetadata } from './http'

export const presentationMetadata = concatModuleMetadata([
  httpControllerMetadata,
])
