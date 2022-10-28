import { GridColumns } from '@mui/x-data-grid'

import { BioProductResponseDto, TestResponseDto } from 'src/api/test'
import { TestCategoryResponseDto } from 'src/api/test-category'

export const NO_BIOPRODUCT = 'NO_BIOPRODUCT'

export function useTestColumns(
  testCategories: TestCategoryResponseDto[],
  bioProducts: BioProductResponseDto[]
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
      field: 'index',
      headerName: 'Thứ tự',
      type: 'number',
      minWidth: 100,
      sortable: false,
      editable: true,
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
      field: 'bioProduct',
      headerName: 'Sinh phẩm',
      type: 'singleSelect',
      minWidth: 200,
      sortable: false,
      editable: true,
      valueOptions: [{ label: '-- không --', value: NO_BIOPRODUCT }].concat(
        bioProducts?.map((item) => ({
          value: item?.name,
          label: item?.name,
        }))
      ),
      valueGetter: ({ value }) => {
        return value?.name ?? ''
      },
    },
  ]
}
