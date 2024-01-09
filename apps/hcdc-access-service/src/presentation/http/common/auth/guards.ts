import { HttpAuthContextGuard } from './context.guard'
import { HttpJwtGuard } from './jwt'

export const authGuards = [HttpJwtGuard, HttpAuthContextGuard]
