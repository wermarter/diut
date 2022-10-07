import { LoaderFunctionArgs } from 'react-router-dom'

import { AppPermission } from 'src/common/types'
import { checkPermissionSync } from './utils'
import { UnauthorizedException } from './exceptions'
import { InjectorFunction } from 'src/common/utils'

export const authorizationInjector: InjectorFunction<{
  requestedPermission: AppPermission
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
