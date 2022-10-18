import { Stack, Typography } from '@mui/material'

import { BioProductTable } from './components/BioProductTable'

export function ManageBioProductPage() {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h5">Danh sách Sinh phẩm</Typography>
      </Stack>
      <BioProductTable />
    </>
  )
}
