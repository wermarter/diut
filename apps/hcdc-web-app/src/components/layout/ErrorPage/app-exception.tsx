import { Alert, AlertTitle, Button } from '@mui/material'
import { useRouteError } from 'react-router-dom'

import { appConfig } from 'src/config'
import { AppException } from 'src/shared/utils'
import { ErrorLayout } from './error-layout'

export function AppExceptionPage() {
  const exception = useRouteError() as AppException

  if (exception.action != undefined && exception.actionLabel != undefined) {
    return (
      <ErrorLayout>
        <Alert icon={false} severity="error">
          {!appConfig.isProduction && (
            <AlertTitle>{exception.constructor.name}</AlertTitle>
          )}
          {exception.message}
        </Alert>
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
      <Alert icon={false} severity="error">
        {!appConfig.isProduction && (
          <AlertTitle>{exception.constructor.name}</AlertTitle>
        )}
        {exception.message}
      </Alert>
    </ErrorLayout>
  )
}
