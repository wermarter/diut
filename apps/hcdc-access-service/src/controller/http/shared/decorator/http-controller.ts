import {
  CustomHttpController,
  CustomHttpControllerOptions,
} from '@diut/nestjs-infra'
import { UseGuards } from '@nestjs/common'

import { HttpAuthGuard } from '../../v1/auth/guard'

export const HttpController = (options: CustomHttpControllerOptions) => {
  const customOptions: CustomHttpControllerOptions = {
    ...options,
    controllerDecorators: [
      ...(options?.controllerDecorators ?? []),
      UseGuards(HttpAuthGuard),
    ],
  }

  return CustomHttpController(customOptions)
}
