import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common'

export interface AuthTokenPayload {
  sub: string // UserId
}

export const LOCAL_STRATEGY_KEY = 'auth.local'
export const JWT_STRATEGY_KEY = 'auth.jwt'

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  },
)

export const SKIP_JWT_KEY = 'SKIP_JWT_KEY'
export const SkipJWTGuard = SetMetadata(SKIP_JWT_KEY, true)
