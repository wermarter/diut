import { Stack, Typography } from '@mui/material'

import { TestComboTable } from './components/TestComboTable'

export function ManageTestComboPage() {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h5">Danh sách Bộ xét nghiệm</Typography>
      </Stack>
      <TestComboTable />
    </>
  )
}
