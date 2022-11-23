import { Permission } from '@diut/common'
import { GridColumns, GridValueSetterParams } from '@mui/x-data-grid'

import { UserResponseDto } from 'src/api/user'

export const userColumns: GridColumns<UserResponseDto> = [
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
  {
    field: 'permissionManageCore',
    headerName: 'Admin',
    width: 80,
    sortable: false,
    editable: true,
    type: 'boolean',
    valueGetter: ({ row }) => {
      return row.permissions?.includes(Permission.ManageCore) ?? false
    },
    valueSetter: permissionValueSetter(Permission.ManageCore),
  },
  {
    field: 'permissionManageInfo',
    headerName: 'Hồ sơ',
    width: 80,
    sortable: false,
    editable: true,
    type: 'boolean',
    valueGetter: ({ row }) => {
      return row.permissions?.includes(Permission.ManageInfo) ?? false
    },
    valueSetter: permissionValueSetter(Permission.ManageInfo),
  },
  {
    field: 'permissionManageResult',
    headerName: 'Kết quả',
    width: 80,
    sortable: false,
    editable: true,
    type: 'boolean',
    valueGetter: ({ row }) => {
      return row.permissions?.includes(Permission.ManageResult) ?? false
    },
    valueSetter: permissionValueSetter(Permission.ManageResult),
  },
  {
    field: 'permissionViewTestReport',
    headerName: 'Sổ nhận mẫu',
    width: 120,
    sortable: false,
    editable: true,
    type: 'boolean',
    valueGetter: ({ row }) => {
      return row.permissions?.includes(Permission.ViewTestReport) ?? false
    },
    valueSetter: permissionValueSetter(Permission.ViewTestReport),
  },
]

function permissionValueSetter(permission: Permission) {
  return ({ value, row }: GridValueSetterParams) => {
    const userPermissions = new Set(row.permissions)
    if (value === true) {
      userPermissions.add(permission)
    } else {
      userPermissions.delete(permission)
    }
    return { ...row, permissions: Array.from(userPermissions) }
  }
}
