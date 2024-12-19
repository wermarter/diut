import { Alert } from '@mui/material'
import { ErrorLayout } from './error-layout'

export function NotFoundPage() {
  return (
    <ErrorLayout>
      <Alert severity="error">Không tìm thấy liên kết này</Alert>
    </ErrorLayout>
  )
}
