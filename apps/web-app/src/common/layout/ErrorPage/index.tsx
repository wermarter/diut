import { useRouteError } from 'react-router-dom'

import { AppException } from 'src/common/utils'
import { AppExceptionPage } from './app-exception'
import { UnknownExceptionPage } from './unknown-exception'
import { WeirdExceptionPage } from './weird-error'

export function ErrorPage() {
  const error = useRouteError()

  if (!(error instanceof Error)) {
    return <WeirdExceptionPage />
  }

  if (error instanceof AppException) {
    return <AppExceptionPage />
  }

  return <UnknownExceptionPage />
}
