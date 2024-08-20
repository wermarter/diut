import { MongoAbility } from '@casl/ability'
import { PermissionRule, User } from '@diut/hcdc'

export const AUTH_CONTEXT_TOKEN = Symbol('AuthContext')

export interface IAuthContext {
  setData(data: AuthContextData): void

  getData(unsafe?: false): AuthContextData
  getData(unsafe: true): AuthContextData | undefined

  getDataInternal(): AuthContextDataInternal
  getDataExternal(): AuthContextDataExternal
}

export type AuthPayloadInternal = {
  userId: string
}

export type AuthPayloadExternal = {
  authorizedByUserId: string
  authorizedRoute: string
  permissions: PermissionRule[]
  origin: AuthExternalOrigin
  description: string

  routeOptions: unknown
}

export enum AuthType {
  Internal = 'Internal',
  External = 'External',
}

export type AuthContextDataInternal = {
  type: AuthType.Internal
  user: User
  permissions: PermissionRule[]
  ability: MongoAbility

  accessToken: string
  refreshToken: string
}

export enum AuthExternalOrigin {
  Delegated = 'Delegated',
  Clinic = 'Clinic',
}

export type AuthContextDataExternal = {
  type: AuthType.External
  origin: AuthExternalOrigin
  ability: MongoAbility
  authorizedByUserId: string
  authorizedRoute: string
  description: string

  jwt: string
  routeOptions: unknown
}

export type AuthContextData = AuthContextDataInternal | AuthContextDataExternal
