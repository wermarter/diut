import {
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
  RequestMethod,
  applyDecorators,
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { ClassConstructor } from 'class-transformer'
import { CustomOpenApi, CustomOpenApiOptions } from './openapi.decorator'
import { Serialize } from './serialize.decorator'

export interface CustomHttpRouteOptions {
  isPublic?: boolean
  path?: string
  method?: RequestMethod
  code?: HttpStatus
  serialize?: ClassConstructor<unknown>
  openApi?: CustomOpenApiOptions
  routeDecorators?: MethodDecorator[]
}

const methodDecorator = {
  [RequestMethod.GET]: Get,
  [RequestMethod.POST]: Post,
  [RequestMethod.PUT]: Put,
  [RequestMethod.PATCH]: Patch,
  [RequestMethod.DELETE]: Delete,
}

export function CustomHttpRoute({
  isPublic = false,
  path = '/',
  method = RequestMethod.GET,
  code,
  openApi,
  serialize,
  routeDecorators: additionalDecorators,
}: CustomHttpRouteOptions) {
  const decorators: MethodDecorator[] = [methodDecorator[method](path)]

  if (code != undefined) {
    decorators.push(HttpCode(code))
  }

  if (openApi != undefined) {
    decorators.push(CustomOpenApi({ isPublic, ...openApi }))
  } else if (!isPublic) {
    decorators.push(ApiBearerAuth())
  }

  if (serialize != undefined) {
    decorators.push(Serialize(serialize))
  }

  if (additionalDecorators != undefined) {
    decorators.push(...additionalDecorators)
  }

  return applyDecorators(...decorators)
}
