import { GridColDef } from '@mui/x-data-grid'

import { BioProductResponseDto } from 'src/infra/api/access-service/bio-product'

export const bioProductColumns: GridColDef<BioProductResponseDto>[] = [
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
    headerName: 'Tên sinh phẩm',
    flex: 1,
    minWidth: 300,
    sortable: false,
    editable: true,
  },
]
