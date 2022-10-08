import { applyDecorators } from '@nestjs/common'
import { ApiResponse, ApiResponseMetadata } from '@nestjs/swagger'

export interface AppOpenApiOptions {
  responses?: ApiResponseMetadata[]
}

export const AppOpenApi = ({ responses }: AppOpenApiOptions) => {
  const decorators: MethodDecorator[] = []

  // responses.push([
  //   unauthenticated, unauthorized
  // ])

  responses?.forEach((responseOptions) => {
    decorators.push(ApiResponse(responseOptions))
  })

  return applyDecorators(...decorators)
}
