import { SetMetadata } from '@nestjs/common'

export const AUTH_JWT_STRATEGY_KEY = 'auth.jwt'

export const SKIP_AUTH_JWT_GUARD = 'SKIP_JWT_KEY'
export const SkipAuthJWTGuard = SetMetadata(SKIP_AUTH_JWT_GUARD, true)
