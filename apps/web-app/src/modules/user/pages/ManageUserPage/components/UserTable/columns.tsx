import { GridColumns } from '@mui/x-data-grid'

import { UserResponseDto } from 'src/api/user'

export const userColumns: GridColumns<UserResponseDto> = [
  {
    field: 'name',
    headerName: 'Tên',
    flex: 1,
    sortable: false,
    editable: true,
  },
  {
    field: 'username',
    headerName: 'Tên đăng nhập',
    width: 150,
    sortable: false,
    editable: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Điện thoại',
    width: 120,
    sortable: false,
    editable: true,
  },
  {
    field: 'permissionSummary',
    headerName: 'Phân quyền',
    width: 120,
    sortable: false,
    editable: false,
    type: 'number',
    valueGetter({ row }) {
      return row.permissions?.length ?? 0
    },
  },
]
