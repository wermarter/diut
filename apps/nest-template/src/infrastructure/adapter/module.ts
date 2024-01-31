import { concatModuleMetadata } from '@diut/nestjs-infra'

import { logMetadata } from './log'

export const adapterMetadata = concatModuleMetadata([logMetadata])
