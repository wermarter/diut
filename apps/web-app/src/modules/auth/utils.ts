import { AppPermission } from 'src/common/types'
import { useTypedSelector } from 'src/core'
import { selectUserPermissions } from './slice'

export function checkPermission(
  userPermissions: AppPermission[],
  requestedPermission: AppPermission
) {
  return (
    userPermissions?.some(
      (userPermission) => userPermission === requestedPermission
    ) ?? false
  )
}

export function useCheckPermission(requestedPermission: AppPermission) {
  const userPermissions = useTypedSelector(selectUserPermissions)

  return checkPermission(userPermissions, requestedPermission)
}
