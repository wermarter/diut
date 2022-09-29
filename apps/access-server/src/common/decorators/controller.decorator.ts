import { applyDecorators, Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

export interface AppControllerOptions {
  baseName: string
}

export function AppController(options: AppControllerOptions) {
  return applyDecorators(
    ApiTags(options.baseName),
    Controller(options.baseName)
  )
}
