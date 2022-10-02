import { Button, Typography } from '@mui/material'
import { useRouteError } from 'react-router-dom'

import { AppException } from 'src/common/utils'
import { ErrorLayout } from './error-layout'

export function AppExceptionPage() {
  const exception = useRouteError() as AppException

  if (exception.action !== undefined && exception.actionLabel !== undefined) {
    return (
      <ErrorLayout>
        <Typography variant="subtitle1">
          {exception.constructor.name}
        </Typography>
        <Typography variant="subtitle2">{exception.message}</Typography>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ my: 3 }}
          onClick={() => exception.action!()}
          size="small"
        >
          {exception.actionLabel}
        </Button>
      </ErrorLayout>
    )
  }

  return (
    <ErrorLayout>
      <Typography variant="subtitle1">{exception.constructor.name}</Typography>
      <Typography variant="subtitle2">{exception.message}</Typography>
    </ErrorLayout>
  )
}
