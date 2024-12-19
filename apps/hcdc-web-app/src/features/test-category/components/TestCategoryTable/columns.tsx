import { GridColDef } from '@mui/x-data-grid'
import { TestCategoryResponseDto } from 'src/infra/api/access-service/test-category'

export const testCategoryColumns: GridColDef<TestCategoryResponseDto>[] = [
  {
    field: 'displayIndex',
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
