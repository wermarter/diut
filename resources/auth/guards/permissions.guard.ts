import { Reflector } from '@nestjs/core'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import {
  checkPermissionAllOf,
  checkPermissionAnyOf,
  Permission,
} from '@diut/hcdc-common'

import {
  AuthTokenPayload,
  PERMISSION_ANYOF_KEY,
  PERMISSION_ALLOF_KEY,
} from '../auth.common'

@Injectable()
export class PermissionAnyOfGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const user = request.user as AuthTokenPayload
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSION_ANYOF_KEY,
      [context.getHandler(), context.getClass()],
    )

    return checkPermissionAnyOf(user.permissions, requiredPermissions)
  }
}

@Injectable()
export class PermissionAllOfGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const user = request.user as AuthTokenPayload
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSION_ALLOF_KEY,
      [context.getHandler(), context.getClass()],
    )

    return checkPermissionAllOf(user.permissions, requiredPermissions)
  }
}
