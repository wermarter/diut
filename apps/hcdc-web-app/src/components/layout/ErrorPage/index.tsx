import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { AppException } from 'src/shared/utils'
import { AppExceptionPage } from './app-exception'
import { NotFoundPage } from './not-found'
import { UnknownExceptionPage } from './unknown-exception'
import { WeirdExceptionPage } from './weird-error'

export function ErrorPage() {
  const error = useRouteError()
  console.warn(error)

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />
  }

  if (!(error instanceof Error)) {
    return <WeirdExceptionPage />
  }

  if (error instanceof AppException) {
    return <AppExceptionPage />
  }

  return <UnknownExceptionPage />
}
