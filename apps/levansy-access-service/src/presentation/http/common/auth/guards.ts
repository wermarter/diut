import { AuthzGuard } from './authz.guard'
import { AuthJwtGuard } from './jwt'

export const authGuards = [AuthJwtGuard, AuthzGuard]
