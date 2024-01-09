import { isAdmin, Permission } from '@diut/hcdc-common'
import { GridColDef, GridValueSetterParams } from '@mui/x-data-grid'

import { UserResponseDto } from 'src/api/user'

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
  generatePermissionColumn(Permission.Admin, 'Admin'),
  generatePermissionColumn(Permission.ManageInfo, 'Thông tin'),
  generatePermissionColumn(Permission.ManageResult, 'Kết quả'),
  generatePermissionColumn(Permission.PrintResult, 'In KQ'),
  generatePermissionColumn(Permission.ViewTestReport, 'Sổ nhận mẫu'),
  generatePermissionColumn(Permission.ExportTraKQ, 'Trả KQ'),
  generatePermissionColumn(Permission.ExportGiaoNhanMau, 'Giao nhận mẫu'),
  //
  generatePermissionColumn(Permission.ExportSinhHoa, '1.SinhHoa'),
  generatePermissionColumn(Permission.ExportPapSmear, '2.PapSmear'),
  generatePermissionColumn(Permission.ExportHCG, '3.hCG'),
  generatePermissionColumn(Permission.ExportUrine10, '4.Urine10'),
  generatePermissionColumn(Permission.ExportTD, '5.TDĐ'),
  generatePermissionColumn(Permission.ExportCTM, '6.CTM'),
  generatePermissionColumn(Permission.ExportHIV, '7.HIV'),
  generatePermissionColumn(Permission.ExportSoiNhuom, '8.SoiNhuom'),
  generatePermissionColumn(Permission.ExportThinPrep, '9.ThinPrep'),
]

function generatePermissionColumn(
  permission: Permission,
  label: string,
  width = 80,
): (typeof userColumns)[number] {
  return {
    field: permission,
    headerName: label,
    width,
    sortable: false,
    editable: true,
    type: 'boolean',
    valueGetter: ({ row }) => {
      if (isAdmin(row.permissions)) {
        return true
      }
      return row.permissions?.includes(permission) ?? false
    },
    valueSetter: permissionValueSetter(permission),
  }
}

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
