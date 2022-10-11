import { Role } from '@diut/common'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { AppPermission } from 'src/common/app-permission'

export interface AuthTokenPayload {
  sub: string // UserId
  roles: Role[]
  permissions: AppPermission[]
}

export const LOCAL_STRATEGY_KEY = 'local'
export const JWT_STRATEGY_KEY = 'jwt'

export const ROLES_KEY = 'roles'
export const IS_PUBLIC_KEY = 'isPublic'

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)
