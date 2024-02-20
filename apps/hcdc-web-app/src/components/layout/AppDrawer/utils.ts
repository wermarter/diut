import { PermissionRule, isAuthorizedOneOf } from '@diut/hcdc'
import { ReactElement } from 'react'
import { To } from 'react-router-dom'

export interface MenuItem {
  icon: ReactElement
  label: string
  destination: To
  isAuthorized?: (
    userPermissions: PermissionRule[],
    branchId: string,
  ) => boolean
}

export interface DrawerItem {
  title: string
  children: MenuItem[]
}

export function authOneOf(
  authDetails: Parameters<typeof isAuthorizedOneOf>[1],
) {
  return (userPermissions: PermissionRule[], branchId: string) => {
    if (branchId) {
      return isAuthorizedOneOf(
        userPermissions,
        authDetails.map(({ filterObj: originalFilterObj, ...details }) => ({
          ...details,
          filterObj: { ...(originalFilterObj ?? {}), branchId },
        })),
      )
    }

    return isAuthorizedOneOf(userPermissions, authDetails)
  }
}
