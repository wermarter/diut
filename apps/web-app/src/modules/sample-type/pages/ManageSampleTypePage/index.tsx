import { Stack, Typography } from '@mui/material'

import { SampleTypeTable } from './components/SampleTypeTable'

export function ManageSampleTypePage() {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h5">Danh sách Loại mẫu</Typography>
      </Stack>
      <SampleTypeTable />
    </>
  )
}
