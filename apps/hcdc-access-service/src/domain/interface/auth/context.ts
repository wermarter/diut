import { MongoAbility } from '@casl/ability'
import { User } from '@diut/hcdc'

export const AuthContextToken = Symbol('AuthContext')

export interface IAuthContext {
  setData(data: AuthContextData): void

  getData(unsafe?: false): AuthContextData
  getData(unsafe: true): AuthContextData | undefined
}

export type AuthPayload = {
  userId: string
}

export type AuthContextData = {
  user: User
  ability: MongoAbility
}
