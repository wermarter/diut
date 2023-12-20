import { SetMetadata } from '@nestjs/common'

export const JWT_STRATEGY_KEY = 'auth.jwt'

export const SKIP_JWT_KEY = 'SKIP_JWT_KEY'
export const SkipJWTGuard = SetMetadata(SKIP_JWT_KEY, true)
