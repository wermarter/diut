import { LoaderFunctionArgs } from 'react-router-dom'
import { Permission } from '@diut/common'

import { checkPermissionSync } from './utils'
import { UnauthorizedException } from './exceptions'
import { InjectorFunction } from 'src/common/utils'

export const authorizationInjector: InjectorFunction<{
  requestedPermission: Permission
}> = (args: LoaderFunctionArgs, { requestedPermission }) => {
  if (!checkPermissionSync(requestedPermission)) {
    throw new UnauthorizedException({
      message: 'Bạn không có quyền truy cập trang này.',
      actionLabel: 'Yêu cầu cấp quyền',
      action: () => {
        alert('Cấp quyền hộ cái :)')
      },
    })
  }
}
