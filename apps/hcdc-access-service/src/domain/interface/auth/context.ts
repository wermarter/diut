import { MongoAbility } from '@casl/ability'
import { User } from '@diut/hcdc'

export const AuthContextToken = Symbol('AuthContext')

export interface IAuthContext {
  getData(): AuthContextData
}

export type AuthPayload = {
  userId: string
}

export type AuthContextData = {
  user: User
  ability: MongoAbility
}
