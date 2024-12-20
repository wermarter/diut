import { MongoAbility } from '@casl/ability'
import { ExternalRoutePath, PermissionRule, User } from '@diut/hcdc'
import { ExternalRouteOptions } from './external-route'

export const AUTH_CONTEXT_TOKEN = Symbol('AUTH_CONTEXT_TOKEN')

export interface IAuthContext {
  setData(data: AuthContextData): void

  getData(unsafe?: false): AuthContextData
  getData(unsafe: true): AuthContextData | undefined

  getDataInternal(): AuthContextDataInternal
  getDataExternal<
    TPath extends ExternalRoutePath,
  >(): AuthContextDataExternal<TPath>
}

export type AuthPayloadInternal = {
  userId: string
}

export type AuthPayloadExternal<
  TPath extends ExternalRoutePath = ExternalRoutePath,
> = {
  description: string

  path: TPath
  routeOptions: ExternalRouteOptions[TPath]

  authorizedByUserId: string
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

export type AuthContextDataInternalSerialized = Pick<
  AuthContextDataInternal,
  'user' | 'permissions'
>

export type AuthContextDataExternal<
  TPath extends ExternalRoutePath = ExternalRoutePath,
> = {
  type: AuthType.External

  path: TPath
  routeOptions: ExternalRouteOptions[TPath]

  ability: MongoAbility
  authorizedByUserId: string
  description: string

  jwt: string
}

export type AuthContextData = AuthContextDataInternal | AuthContextDataExternal
