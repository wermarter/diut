import { useTypedSelector, drawerItems, DrawerItem } from 'src/core'
import { checkPermission, selectUserPermissions } from 'src/modules/auth'

export function useDrawerItems() {
  const userPermissions = useTypedSelector(selectUserPermissions)

  const result = drawerItems.map((group) => {
    // Group permission
    if (
      group.permission &&
      !checkPermission(userPermissions, group.permission)
    ) {
      return null
    }

    // Children permission
    let filteredChildren = group.children.filter((item) => {
      if (
        item.permission &&
        !checkPermission(userPermissions, item.permission)
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

  return result.filter((group): group is DrawerItem => group !== null)
}
