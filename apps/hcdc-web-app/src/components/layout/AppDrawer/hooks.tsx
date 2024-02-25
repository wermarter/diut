import { useMemo } from 'react'

import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { drawerItems } from './drawer-items'
import { DrawerItemGroup } from './utils'

export function useDrawerItems() {
  const permissions = useTypedSelector(
    authSlice.selectors.selectUserPermissions,
  )
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!

  const result = useMemo(() => {
    const result = drawerItems.map((group) => {
      let filteredChildren = group.children.filter((item) => {
        if (item.isAuthorized === undefined) {
          return true
        }

        return item.isAuthorized(permissions, branchId)
      })

      if (!(filteredChildren && filteredChildren.length > 0)) {
        return null
      }

      return {
        ...group,
        children: filteredChildren,
      }
    })

    return result.filter((group): group is DrawerItemGroup => group !== null)
  }, [permissions, branchId])

  return result
}
