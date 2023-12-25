import { AuthContextGuard } from './context.guard'
import { AuthJwtGuard } from './jwt'

export const authGuards = [AuthJwtGuard, AuthContextGuard]
