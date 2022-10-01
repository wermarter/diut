import { Button, Typography } from '@mui/material'
import { useNavigate, useRouteError } from 'react-router-dom'

import { AppException } from 'src/common/utils'
import { ErrorLayout } from './error-layout'

export function AppExceptionPage() {
  const exception = useRouteError() as AppException
  const navigate = useNavigate()

  if (
    exception.redirectTo !== undefined &&
    exception.redirectLabel !== undefined
  ) {
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
          onClick={() => {
            navigate(exception.redirectTo!)
          }}
        >
          {exception.redirectLabel}
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
