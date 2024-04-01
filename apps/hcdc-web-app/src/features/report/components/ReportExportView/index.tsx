import { Box, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import { ExportSinhHoaButton } from '../ExportSinhHoaButton'

export function ReportExportView() {
  return (
    <Box
      sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={4}>{/* <ExportSoiNhuom /> */}</Grid>
          <Grid xs={4}>
            <ExportSinhHoaButton />
          </Grid>
          <Grid xs={4}>{/* <ExportTD /> */}</Grid>
          <Grid xs={4}>{/* <ExportUrine10 /> */}</Grid>
          <Grid xs={4}>{/* <ExportHCG /> */}</Grid>
          <Grid xs={4}>{/* <ExportPapSmear /> */}</Grid>
          <Grid xs={4}>{/* <ExportThinPrep /> */}</Grid>
          <Grid xs={4}>{/* <ExportHIV /> */}</Grid>
          <Grid xs={4}>{/* <ExportCTM /> */}</Grid>
        </Grid>
      </Paper>
      <Paper variant="outlined" sx={{ p: 2, my: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={6}>{/* <ExportTraKQ /> */}</Grid>
          <Grid xs={6}>{/* <ExportGiaoNhanMau /> */}</Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
