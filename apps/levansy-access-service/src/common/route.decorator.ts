import { Permission } from '@diut/levansy-common'
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
import { ApiBearerAuth } from '@nestjs/swagger'
import { ClassConstructor } from 'class-transformer'
import { AppOpenApi, AppOpenApiOptions, Serialize } from '@diut/nest-core'

import { PermissionAllOf, PermissionAnyOf } from 'src/auth/auth.common'
import {
  JwtAuthGuard,
  PermissionAllOfGuard,
  PermissionAnyOfGuard,
} from 'src/auth/guards'

export interface AppRouteOptions {
  isPublic?: boolean
  permissionAnyOf?: Permission[]
  permissionAllOf?: Permission[]
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

/**
 * authorization and openapi
 */
export function AppRoute({
  isPublic = false,
  permissionAnyOf = [],
  permissionAllOf = [],
  path = '/',
  method = RequestMethod.GET,
  code,
  openApi,
  serialize,
}: AppRouteOptions) {
  const decorators: MethodDecorator[] = [methodDecorator[method](path)]

  if (!isPublic) {
    decorators.push(UseGuards(JwtAuthGuard))

    if (permissionAnyOf.length > 0) {
      decorators.push(UseGuards(PermissionAnyOfGuard))
      decorators.push(PermissionAnyOf(permissionAnyOf))
    }
    if (permissionAllOf.length > 0) {
      decorators.push(UseGuards(PermissionAllOfGuard))
      decorators.push(PermissionAllOf(permissionAllOf))
    }
  }

  if (code !== undefined) {
    decorators.push(HttpCode(code))
  }

  if (openApi !== undefined) {
    decorators.push(AppOpenApi({ isPublic, ...openApi }))
  } else if (!isPublic) {
    decorators.push(ApiBearerAuth())
  }

  if (serialize !== undefined) {
    decorators.push(Serialize(serialize))
  }

  return applyDecorators(...decorators)
}
