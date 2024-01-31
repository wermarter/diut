import { concatModuleMetadata } from '@diut/nestjs-infra'

import { adapterMetadata } from './adapter'

export const infrastructureMetadata = concatModuleMetadata([adapterMetadata])
