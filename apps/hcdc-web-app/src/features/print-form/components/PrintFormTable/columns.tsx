import { PrintTemplateValues } from '@diut/hcdc'
import { GridColDef } from '@mui/x-data-grid'
import { PrintFormResponseDto } from 'src/infra/api/access-service/print-form'

export const printFormColumns: GridColDef<PrintFormResponseDto>[] = [
  {
    field: 'displayIndex',
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
    field: 'authorTitle',
    headerName: 'Chức vụ',
    width: 220,
    sortable: false,
    editable: true,
  },
  {
    field: 'authorName',
    headerName: 'Tên',
    flex: 1,
    minWidth: 220,
    sortable: false,
    editable: true,
  },
  {
    field: 'titleMargin',
    headerName: 'Độ dãn',
    type: 'number',
    width: 80,
    sortable: false,
    editable: true,
  },
  {
    field: 'isA4',
    type: 'boolean',
    headerName: 'A4',
    width: 80,
    sortable: false,
    editable: true,
  },
  {
    field: 'template',
    headerName: 'Template',
    type: 'singleSelect',
    width: 120,
    sortable: false,
    editable: true,
    valueOptions: PrintTemplateValues,
  },
]
