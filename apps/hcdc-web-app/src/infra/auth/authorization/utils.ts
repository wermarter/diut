import {
  Permission,
  checkPermissionAnyOf,
  checkPermissionAllOf,
} from '@diut/hcdc'

import { appStore, useTypedSelector } from 'src/core'
import { selectUserPermissions } from '../../../features/auth/slice'

export function useCheckPermissionAnyOf(requiredPermissions: Permission[]) {
  const userPermissions = useTypedSelector(selectUserPermissions)

  return checkPermissionAnyOf(userPermissions, requiredPermissions)
}

export function useCheckPermissionAllOf(requiredPermissions: Permission[]) {
  const userPermissions = useTypedSelector(selectUserPermissions)

  return checkPermissionAllOf(userPermissions, requiredPermissions)
}

export function checkPermissionAnyOfSync(
  requiredPermissions: Permission[] | undefined,
) {
  const userPermissions = selectUserPermissions(appStore.getState())

  return checkPermissionAnyOf(userPermissions, requiredPermissions)
}

export function checkPermissionAllOfSync(
  requiredPermissions: Permission[] | undefined,
) {
  const userPermissions = selectUserPermissions(appStore.getState())

  return checkPermissionAllOf(userPermissions, requiredPermissions)
}
