import { GridColumns } from '@mui/x-data-grid'

import { TestCategoryResponseDto } from 'src/api/test-category'

export const testCategoryColumns: GridColumns<TestCategoryResponseDto> = [
  {
    field: 'leftRightIndex',
    headerName: 'Thứ tự',
    type: 'number',
    minWidth: 100,
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
]
