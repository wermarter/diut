import { UseFilters, UseGuards } from '@nestjs/common'

import { authGuards } from '../auth'
import { DomainExceptionFilter } from '../exception-filter'

export const controllerDecorators: ClassDecorator[] = [
  UseGuards(...authGuards),
  UseFilters(DomainExceptionFilter),
]
