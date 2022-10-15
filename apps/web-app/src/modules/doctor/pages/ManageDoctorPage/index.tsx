import { Stack, Typography } from '@mui/material'

import { DoctorTable } from './components/DoctorTable'

export function ManageDoctorPage() {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h5">Danh sách Bác sĩ</Typography>
      </Stack>
      <DoctorTable />
    </>
  )
}
