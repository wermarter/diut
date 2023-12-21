import { concatModuleMetadata } from '@diut/nest-core'

import { authorizationMetadata } from './authorization'
import { authenticationMetadata } from './authentication'
import { adapterMetadata } from './adapter'

export const infrastructureMetadata = concatModuleMetadata([
  authorizationMetadata,
  authenticationMetadata,
  adapterMetadata,
])
