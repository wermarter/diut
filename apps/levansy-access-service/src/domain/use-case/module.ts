import { concatModuleMetadata } from '@diut/nest-core'

import { bioProductUseCaseMetadata } from './bio-product'

export const useCaseMetadata = concatModuleMetadata([bioProductUseCaseMetadata])
