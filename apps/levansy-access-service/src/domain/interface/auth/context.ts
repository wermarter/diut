import { ExecutionContext } from '@nestjs/common'

import { User } from 'src/domain/entity'

export const AuthContextToken = Symbol('AuthContext')

export interface IAuthContext {
  ensureContextData(context: ExecutionContext): Promise<void>
  getData(): ContextData
}

export type ContextData = {
  user: User
}
