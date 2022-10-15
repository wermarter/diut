import { Permission, Role } from '@diut/common'

import { appStore, useTypedSelector } from 'src/core'
import { selectUserPermissions, selectUserRoles } from '../slice'

export function isAdmin(userRoles: Role[]) {
  return userRoles.includes(Role.Admin)
}

export function checkPermission(
  userPermissions: Permission[],
  requestedPermission: Permission,
  userRoles?: Role[]
) {
  if (userRoles && isAdmin(userRoles)) {
    return true
  }

  return (
    userPermissions?.some(
      (userPermission) => userPermission === requestedPermission
    ) ?? false
  )
}

export function useCheckPermission(requestedPermission: Permission) {
  const userPermissions = useTypedSelector(selectUserPermissions)
  const userRoles = useTypedSelector(selectUserRoles)

  return checkPermission(userPermissions, requestedPermission, userRoles)
}

export function checkPermissionSync(requestedPermission: Permission) {
  const userPermissions = selectUserPermissions(appStore.getState())
  const userRoles = selectUserRoles(appStore.getState())

  return checkPermission(userPermissions, requestedPermission, userRoles)
}