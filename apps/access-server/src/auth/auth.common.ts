import { Role } from '@diut/common'
import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common'

import { AppPermission } from 'src/common/app-permission'

export enum LoginExceptionMsg {
  USERNAME_NOT_EXIST = 'USERNAME_NOT_EXIST',
  WRONG_PASSWORD = 'WRONG_PASSWORD',
}

export interface AuthTokenPayload {
  sub: string // UserId
  roles: Role[]
  permissions: AppPermission[]
}

export const LOCAL_STRATEGY_KEY = 'auth.local'
export const JWT_STRATEGY_KEY = 'auth.jwt'

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)

export const ROLES_KEY = 'auth.roles'
export const Roles = (roles: Role[]) => SetMetadata(ROLES_KEY, roles)
