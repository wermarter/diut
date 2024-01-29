import { concatModuleMetadata } from '@diut/nestjs-core'

import { logMetadata } from './log'

export const adapterMetadata = concatModuleMetadata([logMetadata])
