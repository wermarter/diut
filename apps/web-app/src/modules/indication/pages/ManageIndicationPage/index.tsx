import { Stack, Typography } from '@mui/material'

import { IndicationTable } from './components/IndicationTable'

export function ManageIndicationPage() {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h5">Danh sách Chỉ định</Typography>
      </Stack>
      <IndicationTable />
    </>
  )
}
