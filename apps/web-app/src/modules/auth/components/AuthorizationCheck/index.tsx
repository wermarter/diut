import { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  useEffect(() => {
    if (!isPermitted) {
      throw new UnauthorizedException({
        message: 'Bạn không có quyền truy cập trang này.',
      })
    }
  }, [isPermitted])

  return <>{children}</>
}
