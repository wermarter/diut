import { GridColDef } from '@mui/x-data-grid'

import { IndicationResponseDto } from 'src/infra/api/access-service/indication'

export const indicationColumns: GridColDef<IndicationResponseDto>[] = [
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
    headerName: 'Tên chỉ định',
    flex: 1,
    minWidth: 300,
    sortable: false,
    editable: true,
  },
]
