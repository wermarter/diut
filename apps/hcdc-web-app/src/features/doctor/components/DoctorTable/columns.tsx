import { GridColDef } from '@mui/x-data-grid'
import { DoctorResponseDto } from 'src/infra/api/access-service/doctor'

export const doctorColumns: GridColDef<DoctorResponseDto>[] = [
  {
    field: 'displayIndex',
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
