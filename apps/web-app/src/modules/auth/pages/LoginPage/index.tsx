import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useTypedSelector } from 'src/core'
import { selectIsAuthenticated } from '../../slice'
import { LoginForm } from './login-form'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useTypedSelector(selectIsAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from ?? '/', { replace: true })
    }
  }, [isAuthenticated])

  return <LoginForm reason={location.state?.reason} />
}

export { loginPageLoader } from './loader'
