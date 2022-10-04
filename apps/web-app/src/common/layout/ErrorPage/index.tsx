import { isRouteErrorResponse, Navigate, useRouteError } from 'react-router-dom'

import { AppException, AppNavigate } from 'src/common/utils'
import { AppExceptionPage } from './app-exception'
import { NotFoundPage } from './not-found'
import { UnknownExceptionPage } from './unknown-exception'
import { WeirdExceptionPage } from './weird-error'

export function ErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />
  }

  if (error instanceof AppNavigate) {
    return <Navigate {...error.props} />
  }

  // ------------------------------------------------------------------------------
  if (!(error instanceof Error)) {
    return <WeirdExceptionPage />
  }

  if (error instanceof AppException) {
    return <AppExceptionPage />
  }

  return <UnknownExceptionPage />
}
