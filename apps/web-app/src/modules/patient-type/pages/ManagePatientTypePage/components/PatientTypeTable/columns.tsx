import { GridColumns } from '@mui/x-data-grid'

import { PatientTypeResponseDto } from 'src/api/patient-type'

export const patientTypeColumns: GridColumns<PatientTypeResponseDto> = [
  {
    field: 'name',
    headerName: 'Tên',
    flex: 1,
    sortable: false,
    editable: true,
  },
]
