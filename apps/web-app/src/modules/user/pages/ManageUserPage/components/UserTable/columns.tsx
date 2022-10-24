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
    field: 'permissionSummary',
    headerName: 'Phân quyền',
    width: 100,
    sortable: false,
    editable: false,
    type: 'number',
    valueGetter: ({ row }) => {
      return row.permissions?.length ?? 0
    },
  },
  {
    field: 'permissionManageCore',
    headerName: 'Admin',
    width: 100,
    sortable: false,
    editable: true,
    type: 'boolean',
    valueGetter: ({ row }) => {
      return row.permissions?.includes(Permission.ManageCore) ?? false
    },
    valueSetter: permissionValueSetter(Permission.ManageCore),
  },
  {
    field: 'permissionManagePatient',
    headerName: 'Bệnh nhân',
    width: 100,
    sortable: false,
    editable: true,
    type: 'boolean',
    valueGetter: ({ row }) => {
      return row.permissions?.includes(Permission.ManagePatient) ?? false
    },
    valueSetter: permissionValueSetter(Permission.ManagePatient),
  },
  {
    field: 'permissionManageSample',
    headerName: 'Mẫu XN',
    width: 100,
    sortable: false,
    editable: true,
    type: 'boolean',
    valueGetter: ({ row }) => {
      return row.permissions?.includes(Permission.ManageSample) ?? false
    },
    valueSetter: permissionValueSetter(Permission.ManageSample),
  },
  {
    field: 'permissionManageTestResult',
    headerName: 'Kết quả',
    width: 100,
    sortable: false,
    editable: true,
    type: 'boolean',
    valueGetter: ({ row }) => {
      return row.permissions?.includes(Permission.ManageTestResult) ?? false
    },
    valueSetter: permissionValueSetter(Permission.ManageTestResult),
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
