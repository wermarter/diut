import { applyDecorators, Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

export interface AppControllerOptions {
  basePath: string
}

export function AppController(options: AppControllerOptions) {
  return applyDecorators(
    ApiTags(options.basePath.toUpperCase()),
    Controller(options.basePath)
  )
}
