import { applyDecorators, HttpStatus } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiResponse,
  ApiResponseMetadata,
} from '@nestjs/swagger'

export interface AppOpenApiOptions {
  isPublic?: boolean
  responses?: ApiResponseMetadata[]
}

export const AppOpenApi = ({
  isPublic = false,
  responses,
}: AppOpenApiOptions) => {
  const decorators: MethodDecorator[] = []

  if (!isPublic) {
    decorators.push(ApiBearerAuth())
  }

  responses?.forEach(({ status, ...responseOptions }) => {
    decorators.push(
      ApiResponse({
        ...responseOptions,
        status: status ?? HttpStatus.OK,
      })
    )
  })

  return applyDecorators(...decorators)
}
