import { AppPermission } from 'src/common/types'
import { useTypedSelector } from 'src/core'
import { selectUserPermissions } from './slice'

export function useCheckPermission(requestedPermission: AppPermission) {
  const userPermissions = useTypedSelector(selectUserPermissions)

  return (
    userPermissions?.some(
      (userPermission) => userPermission === requestedPermission
    ) ?? false
  )
}
