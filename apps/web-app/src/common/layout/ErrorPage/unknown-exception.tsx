import { Alert, AlertTitle } from '@mui/material'
import { useRouteError } from 'react-router-dom'

import { ErrorLayout } from './error-layout'

export function UnknownExceptionPage() {
  const exception = useRouteError() as Error

  return (
    <ErrorLayout>
      <Alert icon={false} severity="error">
        <AlertTitle>{exception.constructor.name}</AlertTitle>
        {exception.message}
      </Alert>
    </ErrorLayout>
  )
}
