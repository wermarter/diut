import { GridColumns } from '@mui/x-data-grid'

import { DoctorResponseDto } from 'src/api/doctor'

export const doctorColumns: GridColumns<DoctorResponseDto> = [
  {
    field: 'name',
    headerName: 'Tên',
    flex: 1,
    sortable: false,
    editable: true,
  },
]
