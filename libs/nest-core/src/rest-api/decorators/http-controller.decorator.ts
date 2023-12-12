import { applyDecorators, Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

export type CustomHttpControllerOptions = {
  basePath: string
}

export function CustomHttpController(options: CustomHttpControllerOptions) {
  return applyDecorators(
    ApiTags(options.basePath),
    Controller(options.basePath),
  )
}
