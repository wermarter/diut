import { Box, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import { BranchResponseDto } from 'src/infra/api/access-service/branch'
import { ExportSinhHoaButton } from '../ExportSinhHoaButton'
import { ExportSoiNhuomButton } from '../ExportSoiNhuomButton'
import { ExportTddButton } from '../ExportTDDButton'

export type ReportExportViewProps = {
  origins: BranchResponseDto[]
}

export function ReportExportView(props: ReportExportViewProps) {
  return (
    <Box
      sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <ExportSoiNhuomButton origins={props.origins} />
          </Grid>
          <Grid xs={4}>
            <ExportSinhHoaButton origins={props.origins} />
          </Grid>
          <Grid xs={4}>
            <ExportTddButton origins={props.origins} />
          </Grid>
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
