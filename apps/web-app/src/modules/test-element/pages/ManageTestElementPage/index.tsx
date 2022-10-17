import { Stack, Typography } from '@mui/material'

import { TestElementTable } from './components/TestElementTable'

export function ManageTestElementPage() {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h5">Danh sách Thành phần xét nghiệm</Typography>
      </Stack>
      <TestElementTable />
    </>
  )
}
