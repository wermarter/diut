import { concatModuleMetadata } from '@diut/nestjs-infra'

import { httpControllerMetadata } from './http'

export const presentationMetadata = concatModuleMetadata([
  httpControllerMetadata,
])
