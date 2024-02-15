import { GridColDef } from '@mui/x-data-grid'

import { SampleOriginResponseDto } from 'src/infra/api/access-service/sample-origin'

export const sampleOriginColumns: GridColDef<SampleOriginResponseDto>[] = [
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
    headerName: 'Tên đơn vị',
    flex: 1,
    minWidth: 300,
    sortable: false,
    editable: true,
  },
]
