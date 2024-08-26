import { ModuleMetadata } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

import { appMetadata } from 'src/app'
import { exceptionFilters } from './exception-filter'

export const commonModuleMetadata: ModuleMetadata[] = [
  appMetadata,
  {
    // use at this level for catching Express 404
    providers: exceptionFilters.map((FilterClass) => ({
      provide: APP_FILTER,
      useClass: FilterClass,
    })),
  },
]
