import { PermissionRule } from '@diut/hcdc'

import { BranchResponseDto } from 'src/infra/api/access-service/branch'

type AuthData = {
  id: string
  name: string
  activeBranchId: string
  branchIds: string[]
  branches: BranchResponseDto[]
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
