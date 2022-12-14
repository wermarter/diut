import { PropsWithChildren, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { AppNavigate } from 'src/common/utils'
import { useTypedSelector } from 'src/core'
import { selectIsAuthenticated } from '../slice'

export type AuthenticationCheckProps = PropsWithChildren

export function AuthenticationCheck({ children }: AuthenticationCheckProps) {
  const location = useLocation()
  const isAuthenticated = useTypedSelector(selectIsAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      throw new AppNavigate({
        to: '/login',
        state: {
          from: location.pathname,
          reason: 'Vui lòng đăng nhập để truy cập vào hệ thống.',
        },
        replace: true,
      })
    }
  }, [isAuthenticated])

  return <>{children}</>
}
