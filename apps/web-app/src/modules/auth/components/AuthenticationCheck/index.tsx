import { PropsWithChildren, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useTypedSelector } from 'src/core'
import { selectIsAuthenticated } from '../../slice'

export type AuthenticationCheckProps = PropsWithChildren

export function AuthenticationCheck({ children }: AuthenticationCheckProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useTypedSelector(selectIsAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: location.pathname,
          reason: 'Vui lòng đăng nhập để truy cập vào hệ thống.',
        },
      })
    }
  }, [isAuthenticated])

  return <>{children}</>
}
