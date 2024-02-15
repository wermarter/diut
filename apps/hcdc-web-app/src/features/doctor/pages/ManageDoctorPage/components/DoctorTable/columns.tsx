import { GridColDef } from '@mui/x-data-grid'

import { DoctorResponseDto } from 'src/infra/api/doctor'

export const doctorColumns: GridColDef<DoctorResponseDto>[] = [
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
