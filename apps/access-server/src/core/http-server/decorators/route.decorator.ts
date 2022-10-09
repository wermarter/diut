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
import { ClassConstructor } from 'class-transformer'

import { AppOpenApi, AppOpenApiOptions } from './openapi.decorator'
import { Serialize } from './serialize.decorator'

export interface AppRouteOptions {
  path?: string
  method?: RequestMethod
  code?: HttpStatus
  serialize?: ClassConstructor<unknown>
  openApi?: AppOpenApiOptions
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
  code,
  openApi,
  serialize,
}: AppRouteOptions) {
  const decorators: MethodDecorator[] = [methodDecorator[method](path)]

  if (code !== undefined) {
    decorators.push(HttpCode(code))
  }

  if (openApi !== undefined) {
    decorators.push(AppOpenApi(openApi))
  }

  if (serialize !== undefined) {
    decorators.push(Serialize(serialize))
  }

  return applyDecorators(...decorators)
}
