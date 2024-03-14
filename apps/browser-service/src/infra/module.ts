import { concatModuleMetadata } from '@diut/nestjs-infra'

import { logMetadata } from './log'

export const infraMetadata = concatModuleMetadata([logMetadata])
