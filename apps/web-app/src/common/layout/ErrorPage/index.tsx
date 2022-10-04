import { Navigate, useRouteError } from 'react-router-dom'

import { AppException, AppNavigate } from 'src/common/utils'
import { AppExceptionPage } from './app-exception'
import { UnknownExceptionPage } from './unknown-exception'
import { WeirdExceptionPage } from './weird-error'

export function ErrorPage() {
  const error = useRouteError()

  if (error instanceof AppNavigate) {
    return <Navigate {...error.props} />
  }

  if (!(error instanceof Error)) {
    return <WeirdExceptionPage />
  }

  if (error instanceof AppException) {
    return <AppExceptionPage />
  }

  return <UnknownExceptionPage />
}
