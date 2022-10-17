import { GridColumns } from '@mui/x-data-grid'

import { TestResponseDto } from 'src/api/test'
import { TestCategoryResponseDto } from 'src/api/test-category'

export function useTestColumns(
  testCategories: TestCategoryResponseDto[]
): GridColumns<TestResponseDto> {
  return [
    {
      field: 'category',
      headerName: 'Nhóm XN',
      type: 'singleSelect',
      minWidth: 300,
      sortable: false,
      editable: true,
      valueOptions: testCategories?.map((item) => ({
        value: item?.name,
        label: item?.name,
      })),
      valueGetter: ({ value }) => {
        return value?.name ?? ''
      },
    },
    {
      field: 'name',
      headerName: 'Tên xét nghiệm',
      minWidth: 300,
      flex: 1,
      sortable: false,
      editable: true,
    },
    {
      field: 'topBottomIndex',
      headerName: 'Thứ tự',
      type: 'number',
      minWidth: 100,
      sortable: false,
      editable: true,
    },
  ]
}
