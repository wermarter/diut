import { Typography } from '@mui/material'
import { useRouteError } from 'react-router-dom'

import { ErrorLayout } from './error-layout'

export function UnknownExceptionPage() {
  const exception = useRouteError() as Error

  return (
    <ErrorLayout>
      <Typography variant="subtitle1">{exception.constructor.name}</Typography>
      <Typography variant="subtitle2">{exception.message}</Typography>
    </ErrorLayout>
  )
}
