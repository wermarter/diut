import { Stack, Typography } from '@mui/material'

import { TestTable } from './components/TestTable'

export function ManageTestPage() {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h5">Danh sách Xét nghiệm</Typography>
      </Stack>
      <TestTable />
    </>
  )
}
