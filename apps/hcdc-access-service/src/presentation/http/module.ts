import { concatModuleMetadata } from '@diut/nestjs-infra'
import { APP_FILTER } from '@nestjs/core'

import { httpControllerV1Metadata } from './v1'
import { authMetadata, exceptionFilters } from './common'

export const httpControllerMetadata = concatModuleMetadata([
  {
    providers: exceptionFilters.map((FilterClass) => ({
      provide: APP_FILTER,
      useClass: FilterClass,
    })),
  },
  authMetadata,
  httpControllerV1Metadata,
])
