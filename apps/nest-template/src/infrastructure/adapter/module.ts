import { concatModuleMetadata } from '@diut/nest-core'

import { logMetadata } from './log'

export const adapterMetadata = concatModuleMetadata([logMetadata])
