import {
  applyDecorators,
  Get,
  RequestMethod,
  Put,
  Post,
  Delete,
  Patch,
  HttpStatus,
  HttpCode,
} from '@nestjs/common'

import { ResponseDecorator, ResponseOptions } from './response.decorator'

export interface AppRouteOptions {
  path?: string
  method?: RequestMethod
  responses?: ResponseOptions[]
}

const methodDecorator = {
  [RequestMethod.GET]: Get,
  [RequestMethod.POST]: Post,
  [RequestMethod.PUT]: Put,
  [RequestMethod.PATCH]: Patch,
  [RequestMethod.DELETE]: Delete,
}

export function AppRoute({
  path = '/',
  method = RequestMethod.GET,
  responses = [],
}: AppRouteOptions) {
  const decorators: MethodDecorator[] = [methodDecorator[method](path)]

  responses.forEach((responseOptions) => {
    decorators.push(ResponseDecorator(responseOptions))
  })

  return applyDecorators(...decorators)
}
