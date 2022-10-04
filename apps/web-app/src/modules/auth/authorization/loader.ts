import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom'
import { AppPermission } from 'src/common/types'
import { checkPermissionSync } from './utils'
import { UnauthorizedException } from './exceptions'

export const authorizationLoader =
  (
    requestedPermission: AppPermission,
    loader?: LoaderFunction
  ): LoaderFunction =>
  (args: LoaderFunctionArgs) => {
    if (!checkPermissionSync(requestedPermission)) {
      throw new UnauthorizedException({
        message: 'Bạn không có quyền truy cập trang này.',
        actionLabel: 'Yêu cầu cấp quyền',
        action: () => {
          alert('Cấp quyền hộ cái :)')
        },
      })
    }
    if (loader !== undefined) {
      return loader(args)
    }
  }
