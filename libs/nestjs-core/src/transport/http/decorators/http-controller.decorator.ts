import { applyDecorators, Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

export type CustomHttpControllerOptions = {
  basePath: string
  controllerDecorators?: ClassDecorator[]
}

export function CustomHttpController(options: CustomHttpControllerOptions) {
  return applyDecorators(
    ApiTags(options.basePath.replaceAll('/', '-')),
    Controller(options.basePath),
    ...(options.controllerDecorators ?? []),
  )
}
