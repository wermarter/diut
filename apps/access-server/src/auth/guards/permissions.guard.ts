import { Reflector } from '@nestjs/core'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Permission } from '@diut/common'

import { AuthTokenPayload, PERMISSIONS_KEY } from '../auth.common'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    )

    if (!requiredPermissions) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user as AuthTokenPayload

    return user.permissions.some((userPermission) =>
      requiredPermissions.includes(userPermission)
    )
  }
}
