import { PropsWithChildren, useEffect } from 'react'

import { AppPermission } from 'src/common/types'
import { UnauthorizedException } from '../../exceptions'
import { useCheckPermission } from '../../hooks'

export type AuthorizationCheckProps = PropsWithChildren<{
  permission: AppPermission
}>

export function AuthorizationCheck({
  children,
  permission,
}: AuthorizationCheckProps) {
  const isPermitted = useCheckPermission(permission)

  useEffect(() => {
    if (!isPermitted) {
      throw new UnauthorizedException({
        message: 'Bạn không có quyền truy cập trang này.',
        actionLabel: 'Yêu cầu cấp quyền',
        action: () => {
          alert('Cấp quyền hộ cái :)')
        },
      })
    }
  }, [isPermitted])

  return <>{children}</>
}
