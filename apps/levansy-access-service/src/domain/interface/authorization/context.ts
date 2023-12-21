import { ExecutionContext } from '@nestjs/common'

import { User } from 'src/domain/entity'

export const AuthorizationContextToken = Symbol('AuthorizationContext')

export interface IAuthorizationContext {
  prepareData(context: ExecutionContext): Promise<void>
  getData(): ContextData
}

export type ContextData = {
  user: User
}
