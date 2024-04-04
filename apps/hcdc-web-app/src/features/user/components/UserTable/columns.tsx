import { GridColDef } from '@mui/x-data-grid'

import { UserResponseDto } from 'src/infra/api/access-service/user'

export const userColumns: GridColDef<UserResponseDto>[] = [
  {
    field: 'name',
    headerName: 'Tên',
    flex: 1,
    minWidth: 200,
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
]
