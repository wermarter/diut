import { GridColDef } from '@mui/x-data-grid'
import { identity } from 'es-toolkit'

import { RoleResponseDto } from 'src/infra/api/access-service/role'
import { UserResponseDto } from 'src/infra/api/access-service/user'

export const useUserColumns = (
  roleMap: Map<string, RoleResponseDto>,
): GridColDef<UserResponseDto>[] => {
  return [
    {
      field: 'name',
      headerName: 'Tên',
      width: 250,
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
      field: 'roleIds',
      headerName: 'Phân quyền',
      minWidth: 200,
      flex: 1,
      sortable: false,
      editable: false,
      valueGetter: ({ row }) => {
        return (row.roleIds ?? [])
          .map((roleId) => roleMap.get(roleId)?.name)
          .filter(identity)
          .join(', ')
      },
    },
  ]
}
