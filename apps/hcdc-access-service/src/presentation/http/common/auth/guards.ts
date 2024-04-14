import { HttpJwtGuard } from './jwt'
import { HttpAuthContextGuard } from './context.guard'

export const authGuards = [HttpJwtGuard, HttpAuthContextGuard]
