import { Box, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import { ExportCTM } from './components/ExportCTM'
import { ExportGiaoNhanMau } from './components/ExportGiaoNhanMau'
import { ExportHCG } from './components/ExportHCG'
import { ExportHIV } from './components/ExportHIV'
import { ExportPapSmear } from './components/ExportPapSmear'
import { ExportSinhHoa } from './components/ExportSinhHoa'
import { ExportSoiNhuom } from './components/ExportSoiNhuom'
import { ExportTD } from './components/ExportTD'
import { ExportThinPrep } from './components/ExportThinPrep'
import { ExportTraKQ } from './components/ExportTraKQ'
import { ExportUrine10 } from './components/ExportUrine10'

export function ExportReportPage() {
  return (
    <Box
      sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <ExportSoiNhuom />
          </Grid>
          <Grid xs={4}>
            <ExportSinhHoa />
          </Grid>
          <Grid xs={4}>
            <ExportTD />
          </Grid>
          <Grid xs={4}>
            <ExportUrine10 />
          </Grid>
          <Grid xs={4}>
            <ExportHCG />
          </Grid>
          <Grid xs={4}>
            <ExportPapSmear />
          </Grid>
          <Grid xs={4}>
            <ExportThinPrep />
          </Grid>
          <Grid xs={4}>
            <ExportHIV />
          </Grid>
          <Grid xs={4}>
            <ExportCTM />
          </Grid>
        </Grid>
      </Paper>
      <Paper variant="outlined" sx={{ p: 2, my: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <ExportTraKQ />
          </Grid>
          <Grid xs={6}>
            <ExportGiaoNhanMau />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
