import { Permission } from '@diut/common'

import { appStore, useTypedSelector } from 'src/core'
import { selectUserPermissions } from '../slice'

export function isAdmin(userPermissions: Permission[]) {
  return userPermissions.includes(Permission.ManageCore)
}

export function checkPermission(
  userPermissions: Permission[],
  requestedPermission: Permission
) {
  if (isAdmin(userPermissions)) {
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

  return checkPermission(userPermissions, requestedPermission)
}

export function checkPermissionSync(requestedPermission: Permission) {
  const userPermissions = selectUserPermissions(appStore.getState())

  return checkPermission(userPermissions, requestedPermission)
}
