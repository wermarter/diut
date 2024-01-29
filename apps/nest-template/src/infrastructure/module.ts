import { concatModuleMetadata } from '@diut/nestjs-core'

import { adapterMetadata } from './adapter'

export const infrastructureMetadata = concatModuleMetadata([adapterMetadata])
