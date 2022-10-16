import { Stack, Typography } from '@mui/material'

import { PatientTypeTable } from './components/PatientTypeTable'

export function ManagePatientTypePage() {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h5">Danh sách Đối tượng khám</Typography>
      </Stack>
      <PatientTypeTable />
    </>
  )
}
