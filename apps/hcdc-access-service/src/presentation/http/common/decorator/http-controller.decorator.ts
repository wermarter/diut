import { UseFilters, UseGuards } from '@nestjs/common'
import {
  CustomHttpController,
  CustomHttpControllerOptions,
} from '@diut/nestjs-core'

import { authGuards } from '../auth'
import { exceptionFilters } from '../exception-filter'

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
