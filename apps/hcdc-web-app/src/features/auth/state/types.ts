import { PermissionRule } from '@diut/hcdc'

type AuthData = {
  id: string
  name: string
  branchIds: string[]
  activeBranchId: string
  permissions: PermissionRule[]
}

export type AuthStateAuthenticated = {
  isAuthenticated: true
  data: AuthData
}

export type AuthStateUnauthenticated = {
  isAuthenticated: false
}

export type AuthState = AuthStateAuthenticated | AuthStateUnauthenticated
