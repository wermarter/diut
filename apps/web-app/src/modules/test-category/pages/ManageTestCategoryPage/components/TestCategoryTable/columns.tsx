import { GridColumns } from '@mui/x-data-grid'

import { TestCategoryResponseDto } from 'src/api/test-category'

export const testCategoryColumns: GridColumns<TestCategoryResponseDto> = [
  {
    field: 'name',
    headerName: 'Tên',
    flex: 1,
    sortable: false,
    editable: true,
  },
  {
    field: 'leftRightIndex',
    headerName: 'Thứ tự',
    type: 'number',
    minWidth: 100,
    sortable: false,
    editable: true,
  },
]
