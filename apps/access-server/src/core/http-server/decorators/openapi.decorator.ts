import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiResponse, ApiResponseMetadata } from '@nestjs/swagger'

export interface AppOpenApiOptions {
  responses?: ApiResponseMetadata[]
}

export const AppOpenApi = ({ responses }: AppOpenApiOptions) => {
  const decorators: MethodDecorator[] = []

  // responses.push([
  //   unauthenticated, unauthorized
  // ])

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
