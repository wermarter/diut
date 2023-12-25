import { User } from 'src/domain/entity'

export const AuthContextToken = Symbol('AuthContext')

export interface IAuthContext {
  prepareData(authPayload: AuthPayload | undefined): Promise<void>
  getData(): AuthContextData
}

export type AuthPayload = {
  userId: string
}

export type AuthContextData =
  | undefined // public handler
  | {
      user: User
    }
