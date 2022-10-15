import { Stack, Typography } from '@mui/material'

import { UserTable } from './components/UserTable'

export function ManageUserPage() {
  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h5">Danh sách Người dùng</Typography>
      </Stack>
      <UserTable />
    </>
  )
}
