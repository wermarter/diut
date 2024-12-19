import { PropsWithChildren, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'

export function AuthenticationCheck({ children }: PropsWithChildren) {
  const location = useLocation()
  const navigate = useNavigate()
  const isAuthenticated = useTypedSelector(
    authSlice.selectors.selectIsAuthenticated,
  )

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: location.pathname,
          reason: 'Vui lòng đăng nhập để tiếp tục.',
        },
        replace: true,
      })
    }
  }, [isAuthenticated])

  return <>{children}</>
}
