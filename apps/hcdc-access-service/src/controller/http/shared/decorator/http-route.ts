import { CustomHttpRoute, CustomHttpRouteOptions } from '@diut/nestjs-infra'
import { HttpErrorResponse } from '../dto'

export const HttpRoute = (options: CustomHttpRouteOptions) => {
  const customOptions: CustomHttpRouteOptions = {
    ...options,
    openApi: {
      ...options?.openApi,
      responses: [
        ...(options?.openApi?.responses ?? []),
        {
          status: '4XX',
          description: 'Custom error',
          type: HttpErrorResponse,
        },
      ],
    },
  }

  return CustomHttpRoute(customOptions)
}
