import { concatModuleMetadata } from '@diut/nestjs-infra'

import { exampleMetadata } from './example'

export const appMetadata = concatModuleMetadata([exampleMetadata])
