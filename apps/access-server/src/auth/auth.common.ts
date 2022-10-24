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

export const PERMISSIONS_KEY = 'auth.permissions'
export const Permissions = (permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions)
