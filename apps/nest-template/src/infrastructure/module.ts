import { concatModuleMetadata } from '@diut/nest-core'

import { adapterMetadata } from './adapter'

export const infrastructureMetadata = concatModuleMetadata([adapterMetadata])
