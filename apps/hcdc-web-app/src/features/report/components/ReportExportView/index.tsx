import { Box, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import { BranchResponseDto } from 'src/infra/api/access-service/branch'
import { PatientTypeResponseDto } from 'src/infra/api/access-service/patient-type'
import { TestResponseDto } from 'src/infra/api/access-service/test'
import { TestComboResponseDto } from 'src/infra/api/access-service/test-combo'
import { ExportCTMButton } from '../ExportCTMButton'
import { ExportGiaoNhanButton } from '../ExportGiaoNhanButton'
import { ExportHCGButton } from '../ExportHCGButton'
import { ExportHIVButton } from '../ExportHIVButton'
import { ExportPapButton } from '../ExportPapButton'
import { ExportSinhHoaButton } from '../ExportSinhHoaButton'
import { ExportSoiNhuomButton } from '../ExportSoiNhuomButton'
import { ExportTddButton } from '../ExportTDDButton'
import { ExportThinprepButton } from '../ExportThinprepButton'
import { ExportTraKqButton } from '../ExportTraKqButton'
import { ExportUrineButton } from '../ExportUrineButton'

export type ReportExportViewProps = {
  origins: BranchResponseDto[]
  patientTypes: PatientTypeResponseDto[]
  testCombos: TestComboResponseDto[]
  tests: TestResponseDto[]
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
          <Grid xs={4}>
            <ExportUrineButton origins={props.origins} />
          </Grid>
          <Grid xs={4}>
            <ExportHCGButton origins={props.origins} />
          </Grid>
          <Grid xs={4}>
            <ExportPapButton origins={props.origins} />
          </Grid>
          <Grid xs={4}>
            <ExportThinprepButton origins={props.origins} />
          </Grid>
          <Grid xs={4}>
            <ExportHIVButton origins={props.origins} />
          </Grid>
          <Grid xs={4}>
            <ExportCTMButton origins={props.origins} />
          </Grid>
        </Grid>
      </Paper>
      <Paper variant="outlined" sx={{ p: 2, my: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <ExportTraKqButton
              origins={props.origins}
              patientTypes={props.patientTypes}
              testCombos={props.testCombos}
              tests={props.tests}
            />
          </Grid>
          <Grid xs={6}>
            <ExportGiaoNhanButton
              origins={props.origins}
              testCombos={props.testCombos}
              tests={props.tests}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
