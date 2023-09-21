import { Permission } from '@diut/common'
import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common'

export interface AuthTokenPayload {
  sub: string // UserId
  permissions: Permission[]
}

export const LOCAL_STRATEGY_KEY = 'auth.local'
export const JWT_STRATEGY_KEY = 'auth.jwt'

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)

export const PERMISSION_ANYOF_KEY = 'auth.permissions.anyOf'
export const PERMISSION_ALLOF_KEY = 'auth.permissions.allOf'

export const PermissionAnyOf = (permissions: Permission[]) =>
  SetMetadata(PERMISSION_ANYOF_KEY, permissions)
export const PermissionAllOf = (permissions: Permission[]) =>
  SetMetadata(PERMISSION_ALLOF_KEY, permissions)
