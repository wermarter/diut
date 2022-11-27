import { GridColumns } from '@mui/x-data-grid'

import { PrintFormResponseDto } from 'src/api/print-form'

export const printFormColumns: GridColumns<PrintFormResponseDto> = [
  {
    field: 'index',
    headerName: 'Thứ tự',
    type: 'number',
    width: 100,
    sortable: false,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Tên',
    width: 200,
    sortable: false,
    editable: true,
  },
  {
    field: 'isAuthorLocked',
    type: 'boolean',
    headerName: 'Khoá',
    width: 80,
    sortable: false,
    editable: true,
  },
  {
    field: 'authorPosition',
    headerName: 'Chức vụ',
    width: 250,
    sortable: false,
    editable: true,
  },
  {
    field: 'authorName',
    headerName: 'Tên',
    flex: 1,
    minWidth: 250,
    sortable: false,
    editable: true,
  },
  {
    field: 'titleMargin',
    headerName: 'Độ dãn',
    type: 'number',
    width: 100,
    sortable: false,
    editable: true,
  },
]
