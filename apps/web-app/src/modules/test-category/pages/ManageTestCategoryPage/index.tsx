import { Stack, Typography } from '@mui/material'

import { TestCategoryTable } from './components/TestCategoryTable'

export function ManageTestCategoryPage() {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h5">Danh sách Đối tượng khám</Typography>
      </Stack>
      <TestCategoryTable />
    </>
  )
}
