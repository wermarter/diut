import { GridColumns } from '@mui/x-data-grid'

import { TestResponseDto } from 'src/api/test'
import { TestElementResponseDto } from 'src/api/test-element'

export function useTestElementColumns(
  test: TestResponseDto[]
): GridColumns<TestElementResponseDto> {
  return [
    {
      field: 'topBottomIndex',
      headerName: 'Thứ tự',
      type: 'number',
      minWidth: 100,
      sortable: false,
      editable: true,
    },
    {
      field: 'test',
      headerName: 'Tên XN',
      type: 'singleSelect',
      minWidth: 300,
      sortable: false,
      editable: true,
      valueOptions: test?.map((item) => ({
        value: item?.name,
        label: item?.name,
      })),
      valueGetter: ({ value }) => {
        return value?.name ?? ''
      },
    },
    {
      field: 'name',
      headerName: 'Tên thành phần',
      minWidth: 300,
      flex: 1,
      sortable: false,
      editable: true,
    },
  ]
}
