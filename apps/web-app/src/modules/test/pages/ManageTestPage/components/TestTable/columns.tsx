import { GridColDef } from '@mui/x-data-grid'

import { BioProductResponseDto } from 'src/api/bio-product'
import { PrintFormResponseDto } from 'src/api/print-form'
import { TestResponseDto } from 'src/api/test'
import { TestCategoryResponseDto } from 'src/api/test-category'

export const NO_BIOPRODUCT = 'NO_BIOPRODUCT'

export function useTestColumns(
  testCategories: TestCategoryResponseDto[],
  bioProducts: BioProductResponseDto[],
  printForms: PrintFormResponseDto[],
): GridColDef<TestResponseDto>[] {
  return [
    {
      field: 'category',
      headerName: 'Nhóm XN',
      type: 'singleSelect',
      width: 200,
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
      width: 70,
      sortable: false,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Tên xét nghiệm',
      minWidth: 200,
      flex: 1,
      sortable: false,
      editable: true,
    },
    {
      field: 'bioProduct',
      headerName: 'Sinh phẩm',
      type: 'singleSelect',
      width: 200,
      sortable: false,
      editable: true,
      valueOptions: [{ label: '-- không --', value: NO_BIOPRODUCT }].concat(
        bioProducts?.map((item) => ({
          value: item?.name,
          label: item?.name,
        })),
      ),
      valueGetter: ({ value }) => {
        return value?.name ?? ''
      },
    },
    {
      field: 'shouldNotPrint',
      type: 'boolean',
      headerName: 'Không In',
      width: 80,
      sortable: false,
      editable: true,
    },
    {
      field: 'printForm',
      type: 'singleSelect',
      headerName: 'Form In KQ',
      width: 150,
      sortable: false,
      editable: true,
      valueOptions: printForms.map(({ name }) => ({
        label: name,
        value: name,
      })),
      valueGetter: ({ value }) => {
        return printForms.find(({ _id }) => _id === value)?.name
      },
    },
  ]
}
