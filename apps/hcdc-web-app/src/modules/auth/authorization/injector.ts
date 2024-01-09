import { LoaderFunctionArgs } from 'react-router-dom'
import { Permission } from '@diut/hcdc-common'

import { checkPermissionAllOfSync, checkPermissionAnyOfSync } from './utils'
import { UnauthorizedException } from './exceptions'
import { InjectorFunction } from 'src/common/utils'

export const authorizationInjector: InjectorFunction<{
  permissionAnyOf: Permission[] | undefined
  permissionAllOf: Permission[] | undefined
}> = (args: LoaderFunctionArgs, { permissionAnyOf, permissionAllOf }) => {
  if (
    !checkPermissionAnyOfSync(permissionAnyOf) ||
    !checkPermissionAllOfSync(permissionAllOf)
  ) {
    throw new UnauthorizedException({
      message: 'Bạn không có quyền truy cập trang này.',
      // actionLabel: 'Yêu cầu cấp quyền',
      // action: () => {
      //   alert('Cấp quyền please :)')
      // },
    })
  }

  return {}
}
