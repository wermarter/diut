import { User } from 'src/domain/entity'

export const AuthzContextToken = Symbol('AuthzContext')

export interface IAuthzContext {
  prepareData(authPayload: AuthPayload | undefined): Promise<void>
  getData(): ContextData
}

export type AuthPayload = {
  userId: string
}

export type ContextData = {
  user: User
}
