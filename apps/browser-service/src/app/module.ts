import { concatModuleMetadata } from '@diut/nestjs-infra'

import { browserMetadata } from './browser'

export const appMetadata = concatModuleMetadata([browserMetadata])
