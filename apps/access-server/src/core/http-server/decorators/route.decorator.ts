import { Role } from '@diut/common'
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
  UseGuards,
} from '@nestjs/common'
import { ClassConstructor } from 'class-transformer'

import { Roles } from 'src/auth/auth.common'
import { JwtAuthGuard, RoleAuthGuard } from 'src/auth/guards'
import { AppOpenApi, AppOpenApiOptions } from './openapi.decorator'
import { Serialize } from './serialize.decorator'

export interface AppRouteOptions {
  isPublic?: boolean
  roles?: Role[]
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
  isPublic = false,
  roles = [Role.User],
  path = '/',
  method = RequestMethod.GET,
  code,
  openApi,
  serialize,
}: AppRouteOptions) {
  const decorators: MethodDecorator[] = [methodDecorator[method](path)]

  if (!isPublic) {
    decorators.push(UseGuards(JwtAuthGuard))
    if (roles.length > 0) {
      decorators.push(UseGuards(RoleAuthGuard))
      decorators.push(Roles(roles))
    }
  }

  if (code !== undefined) {
    decorators.push(HttpCode(code))
  }

  if (openApi !== undefined) {
    decorators.push(AppOpenApi({ isPublic, ...openApi }))
  }

  if (serialize !== undefined) {
    decorators.push(Serialize(serialize))
  }

  return applyDecorators(...decorators)
}
