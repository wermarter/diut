import { checkPermission } from '@diut/hcdc'

import { useTypedSelector } from 'src/infra/redux'

export function useDrawerItems() {
  const userPermissions = useTypedSelector(selectUserPermissions)

  const result = drawerItems.map((group) => {
    // Group permission
    if (
      group.permissionAnyOf &&
      !checkPermissionAnyOf(userPermissions, group.permissionAnyOf)
    ) {
      return null
    }
    if (
      group.permissionAllOf &&
      !checkPermissionAllOf(userPermissions, group.permissionAllOf)
    ) {
      return null
    }

    // Children permission
    let filteredChildren = group.children.filter((item) => {
      if (
        item.permissionAnyOf &&
        !checkPermissionAnyOf(userPermissions, item.permissionAnyOf)
      ) {
        return false
      }
      if (
        item.permissionAllOf &&
        !checkPermissionAllOf(userPermissions, item.permissionAllOf)
      ) {
        return false
      }

      return true
    })

    if (!(filteredChildren && filteredChildren.length > 0)) {
      return null
    }

    return {
      ...group,
      children: filteredChildren,
    }
  })

  return result.filter((group): group is DrawerItem => group != null)
}
