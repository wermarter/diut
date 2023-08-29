import { GridColDef } from '@mui/x-data-grid'

import { PatientTypeResponseDto } from 'src/api/patient-type'

export const patientTypeColumns: GridColDef<PatientTypeResponseDto>[] = [
  {
    field: 'index',
    headerName: 'Thứ tự',
    type: 'number',
    minWidth: 100,
    sortable: false,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Tên',
    flex: 1,
    minWidth: 300,
    sortable: false,
    editable: true,
  },
]
