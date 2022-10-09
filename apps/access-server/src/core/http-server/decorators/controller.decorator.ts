import { applyDecorators, Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import * as _ from 'lodash'

export interface AppControllerOptions {
  basePath: string
}

export function AppController(options: AppControllerOptions) {
  return applyDecorators(
    ApiTags(_.lowerCase(options.basePath)),
    Controller(options.basePath)
  )
}
