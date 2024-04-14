import { UseGuards } from '@nestjs/common'
import {
  CustomHttpController,
  CustomHttpControllerOptions,
} from '@diut/nestjs-infra'

import { authGuards } from '../auth'

export const HttpController = (options: CustomHttpControllerOptions) => {
  const customOptions: CustomHttpControllerOptions = {
    ...options,
    controllerDecorators: [
      ...(options?.controllerDecorators ?? []),
      UseGuards(...authGuards),
    ],
  }

  return CustomHttpController(customOptions)
}
