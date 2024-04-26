import { MongoAbility } from '@casl/ability'
import { User } from '@diut/hcdc'

export const AuthContextToken = Symbol('AuthContext')

export interface IAuthContext {
  setData(data: AuthContextData): void

  getData(unsafe?: false): AuthContextData
  getData(unsafe: true): AuthContextData | undefined

  getDataInternal(): Required<AuthContextDataInternal>
}

export type AuthPayload = {
  userId: string
}

export enum AuthType {
  Internal = 'Internal',
  External = 'External',
}

export type AuthContextDataInternal = {
  type: AuthType.Internal
  user: User
  ability: MongoAbility
  metadata?: {
    accessToken: string
    refreshToken: string
  }
}

export enum AuthExternalOrigin {
  Temporary = 'Temporary',
  Clinic = 'Clinic',
}

export type AuthContextDataExternal = {
  type: AuthType.External
  origin: AuthExternalOrigin
  ability: MongoAbility
  metadata?: unknown
}

export type AuthContextData = AuthContextDataInternal | AuthContextDataExternal
