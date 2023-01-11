import { checkPermissionAnyOf, Permission } from '@diut/common'
import { Box, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import { useTypedSelector } from 'src/core'
import { selectUserPermissions } from 'src/modules/auth'
import { ExportSoiNhuom } from './components/ExportSoiNhuom'

export default function ExportReportPage() {
  const userPermissions = useTypedSelector(selectUserPermissions)

  return (
    <Box
      sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={4}>
            {checkPermissionAnyOf(userPermissions, [
              Permission.ExportSoiNhuom,
            ]) && <ExportSoiNhuom />}
          </Grid>
          <Grid xs={4}>
            {checkPermissionAnyOf(userPermissions, [
              Permission.ExportSoiNhuom,
            ]) && <ExportSoiNhuom />}
          </Grid>
          <Grid xs={4}>
            {checkPermissionAnyOf(userPermissions, [
              Permission.ExportSoiNhuom,
            ]) && <ExportSoiNhuom />}
          </Grid>
          <Grid xs={4}>
            {checkPermissionAnyOf(userPermissions, [
              Permission.ExportSoiNhuom,
            ]) && <ExportSoiNhuom />}
          </Grid>
          <Grid xs={4}>
            {checkPermissionAnyOf(userPermissions, [
              Permission.ExportSoiNhuom,
            ]) && <ExportSoiNhuom />}
          </Grid>
          <Grid xs={4}>
            {checkPermissionAnyOf(userPermissions, [
              Permission.ExportSoiNhuom,
            ]) && <ExportSoiNhuom />}
          </Grid>
          <Grid xs={4}>
            {checkPermissionAnyOf(userPermissions, [
              Permission.ExportSoiNhuom,
            ]) && <ExportSoiNhuom />}
          </Grid>
          <Grid xs={4}>
            {checkPermissionAnyOf(userPermissions, [
              Permission.ExportSoiNhuom,
            ]) && <ExportSoiNhuom />}
          </Grid>
          <Grid xs={4}>
            {checkPermissionAnyOf(userPermissions, [
              Permission.ExportSoiNhuom,
            ]) && <ExportSoiNhuom />}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
