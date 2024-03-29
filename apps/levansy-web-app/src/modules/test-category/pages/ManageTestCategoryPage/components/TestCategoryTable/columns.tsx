import { GridColDef } from '@mui/x-data-grid'

import { TestCategoryResponseDto } from 'src/api/test-category'

export const testCategoryColumns: GridColDef<TestCategoryResponseDto>[] = [
  {
    field: 'index',
    headerName: 'Thứ tự nhập',
    type: 'number',
    width: 100,
    sortable: false,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Tên nhóm',
    flex: 1,
    minWidth: 300,
    sortable: false,
    editable: true,
  },
  {
    field: 'reportIndex',
    headerName: 'Thứ tự sổ',
    type: 'number',
    minWidth: 100,
    sortable: false,
    editable: true,
  },
]
