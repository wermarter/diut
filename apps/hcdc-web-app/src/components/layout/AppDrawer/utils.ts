import {
  PermissionRule,
  isAuthorizedAllOf,
  isAuthorizedOneOf,
} from '@diut/hcdc'
import { ReactElement } from 'react'
import { To } from 'react-router-dom'

export interface DrawerItem {
  icon: ReactElement
  label: string
  destination: To
  isAuthorized?: (
    userPermissions: PermissionRule[],
    branchId: string,
  ) => boolean
}

export interface DrawerItemGroup {
  title: string
  children: DrawerItem[]
}

export function authOneOf(
  authDetails: Parameters<typeof isAuthorizedOneOf>[1],
  branchIdFieldName = 'branchId',
) {
  return (userPermissions: PermissionRule[], branchId: string) => {
    if (branchId) {
      return isAuthorizedOneOf(
        userPermissions,
        authDetails.map(({ filterObj: originalFilterObj, ...details }) => ({
          ...details,
          filterObj: {
            ...(originalFilterObj ?? {}),
            [branchIdFieldName]: branchId,
          },
        })),
      )
    }

    return isAuthorizedOneOf(userPermissions, authDetails)
  }
}

export function authAllOf(
  authDetails: Parameters<typeof isAuthorizedAllOf>[1],
) {
  return (userPermissions: PermissionRule[], branchId: string) => {
    if (branchId) {
      return isAuthorizedAllOf(
        userPermissions,
        authDetails.map(({ filterObj: originalFilterObj, ...details }) => ({
          ...details,
          filterObj: { ...(originalFilterObj ?? {}), branchId },
        })),
      )
    }

    return isAuthorizedAllOf(userPermissions, authDetails)
  }
}
