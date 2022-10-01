import { useLocation, useNavigate } from 'react-router-dom'

import { useTypedSelector } from 'src/core'
import { selectIsAuthenticated } from '../../slice'
import { LoginForm } from './login-form'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useTypedSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    navigate(location.state?.from ?? '/')
  }

  return <LoginForm />
}
