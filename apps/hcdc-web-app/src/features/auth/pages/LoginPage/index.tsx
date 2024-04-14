import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useTypedSelector } from 'src/infra/redux'
import { LoginForm } from '../../components'
import { authSlice } from '../../state'

export function urlLoginPage() {
  return '/login'
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useTypedSelector(
    authSlice.selectors.selectIsAuthenticated,
  )

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from ?? '/', { replace: true })
    }
  }, [isAuthenticated])

  return <LoginForm reason={location.state?.reason} />
}
