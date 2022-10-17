import { GridColumns } from '@mui/x-data-grid'

import { IndicationResponseDto } from 'src/api/indication'

export const indicationColumns: GridColumns<IndicationResponseDto> = [
  {
    field: 'name',
    headerName: 'Tên chỉ định',
    flex: 1,
    minWidth: 300,
    sortable: false,
    editable: true,
  },
]
