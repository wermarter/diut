import { GridColDef } from '@mui/x-data-grid'

import { TestComboResponseDto } from 'src/infra/api/access-service/test-combo'

export const testComboColumns: GridColDef<TestComboResponseDto>[] = [
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
  {
    field: 'children',
    headerName: 'Số lượng XN',
    minWidth: 100,
    sortable: false,
    editable: false,
    valueGetter: ({ value }) => {
      return value?.length ?? 0
    },
  },
]
