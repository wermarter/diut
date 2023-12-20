import { ExecutionContext } from '@nestjs/common'

import { User } from 'src/domain/entity'

export const AuthContextToken = Symbol('AuthContext')

export interface IAuthContext {
  populateContextData(context: ExecutionContext): Promise<void>
  getData(): ContextData
}

export type ContextData = {
  user: User
}
