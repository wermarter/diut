import { ModuleMetadata } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { appMetadata } from 'src/app'
import { configMetadata } from 'src/config'
import { infraMetadata } from 'src/infra'
import { exceptionFilters } from './exception-filter'

export const commonModuleMetadata: ModuleMetadata[] = [
  configMetadata,
  infraMetadata,
  appMetadata,
  {
    // use at this level for catching Express 404
    providers: exceptionFilters.map((FilterClass) => ({
      provide: APP_FILTER,
      useClass: FilterClass,
    })),
  },
]
