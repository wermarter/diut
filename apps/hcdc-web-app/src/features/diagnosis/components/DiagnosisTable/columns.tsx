import { GridColDef } from '@mui/x-data-grid'

import { DiagnosisResponseDto } from 'src/infra/api/access-service/diagnosis'

export const diagnosisColumns: GridColDef<DiagnosisResponseDto>[] = [
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
    headerName: 'Tên chỉ định',
    flex: 1,
    minWidth: 300,
    sortable: false,
    editable: true,
  },
]
