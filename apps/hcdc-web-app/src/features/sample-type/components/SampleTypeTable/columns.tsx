import { GridColDef } from '@mui/x-data-grid'

import { SampleTypeResponseDto } from 'src/infra/api/access-service/sample-type'

export const sampleTypeColumns: GridColDef<SampleTypeResponseDto>[] = [
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
    headerName: 'Tên loại mẫu',
    flex: 1,
    minWidth: 300,
    sortable: false,
    editable: true,
  },
]
