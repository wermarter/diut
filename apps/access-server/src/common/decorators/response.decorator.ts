import { applyDecorators } from '@nestjs/common'
import { ApiResponse, ApiResponseMetadata } from '@nestjs/swagger'
import { ClassConstructor } from 'class-transformer'

import { Serialize } from './serialize.decorator'

export type ResponseOptions = Omit<ApiResponseMetadata, 'type'> & {
  type: ClassConstructor<unknown>
}

export const ResponseDecorator = (options: ResponseOptions) => {
  return applyDecorators(ApiResponse(options), Serialize(options.type))
}
