import { UseFilters, UseGuards } from '@nestjs/common'

import { authGuards } from '../auth'
import { exceptionFilters } from '../exception'

export const controllerDecorators: ClassDecorator[] = [
  UseGuards(...authGuards),
  UseFilters(...exceptionFilters),
]
