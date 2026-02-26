import { GridColDef } from '@mui/x-data-grid'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'

export const branchColumns: GridColDef<BranchResponseDto>[] = [
  {
    field: 'displayIndex',
    headerName: 'Thứ tự',
    type: 'number',
    minWidth: 100,
    sortable: false,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Tên chi nhánh',
    flex: 1,
    minWidth: 300,
    sortable: false,
    editable: true,
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    minWidth: 500,
    sortable: false,
    editable: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    minWidth: 200,
    sortable: false,
    editable: true,
  },
  {
    field: 'numberOrigins',
    headerName: 'Liên kết',
    minWidth: 100,
    sortable: false,
    editable: false,
    valueGetter: ({ row }) => {
      const origins = row.sampleOriginIds ?? []
      return origins.length
    },
  },
]
