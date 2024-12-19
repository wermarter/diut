import { GridColDef } from '@mui/x-data-grid'
import { InstrumentResponseDto } from 'src/infra/api/access-service/instrument'

export const instrumentColumns: GridColDef<InstrumentResponseDto>[] = [
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
    headerName: 'Tên máy XN',
    flex: 1,
    minWidth: 300,
    sortable: false,
    editable: true,
  },
]
