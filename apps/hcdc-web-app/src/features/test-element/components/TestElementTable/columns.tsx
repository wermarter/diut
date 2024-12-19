import { GridColDef } from '@mui/x-data-grid'
import { TestElementResponseDto } from 'src/infra/api/access-service/test-element'

export const testElementColumns: GridColDef<TestElementResponseDto>[] = [
  {
    field: 'isParent',
    type: 'boolean',
    headerName: 'TP lớn',
    minWidth: 80,
    sortable: false,
    editable: true,
    valueGetter: ({ value }) => {
      return value ?? false
    },
  },
  {
    field: 'displayIndex',
    headerName: 'Thứ tự nhập',
    type: 'number',
    minWidth: 70,
    sortable: false,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Tên thành phần',
    minWidth: 200,
    flex: 1,
    sortable: false,
    editable: true,
  },
  {
    field: 'printIndex',
    headerName: 'Thứ tự In',
    type: 'number',
    minWidth: 70,
    sortable: false,
    editable: true,
  },
  {
    field: 'reportIndex',
    headerName: 'Thứ tự Sổ',
    type: 'number',
    minWidth: 70,
    sortable: false,
    editable: true,
  },
  {
    field: 'unit',
    headerName: 'Đơn vị',
    minWidth: 80,
    sortable: false,
    editable: true,
    valueGetter: ({ value }) => {
      return value ?? ''
    },
  },
]
