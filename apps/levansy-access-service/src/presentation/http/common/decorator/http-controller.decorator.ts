import { UseFilters, UseGuards } from '@nestjs/common'
import {
  CustomHttpController,
  CustomHttpControllerOptions,
} from '@diut/nest-core'

import { authGuards } from '../auth'
import { exceptionFilters } from '../exception'

export const HttpController = (options: CustomHttpControllerOptions) => {
  const customOptions: CustomHttpControllerOptions = {
    ...options,
    controllerDecorators: [
      ...(options?.controllerDecorators ?? []),
      UseGuards(...authGuards),
      UseFilters(...exceptionFilters),
    ],
  }

  return CustomHttpController(customOptions)
}
