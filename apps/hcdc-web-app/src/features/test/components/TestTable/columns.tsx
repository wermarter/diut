import { GridColDef } from '@mui/x-data-grid'

import { BioProductResponseDto } from 'src/infra/api/access-service/bio-product'
import { PrintFormResponseDto } from 'src/infra/api/access-service/print-form'
import { TestResponseDto } from 'src/infra/api/access-service/test'
import { TestCategoryResponseDto } from 'src/infra/api/access-service/test-category'

const NO_BIOPRODUCT = '-- không --'
const NO_PRINTFORM = '-- không --'

export function useTestColumns(
  testCategories: TestCategoryResponseDto[],
  bioProducts: BioProductResponseDto[],
  printForms: PrintFormResponseDto[],
): GridColDef<TestResponseDto>[] {
  return [
    {
      field: 'testCategoryId',
      headerName: 'Nhóm XN',
      type: 'singleSelect',
      width: 200,
      sortable: false,
      editable: true,
      valueOptions: testCategories.map((item) => ({
        value: item._id,
        label: item.name,
      })),
    },
    {
      field: 'displayIndex',
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
      field: 'bioProductId',
      headerName: 'Sinh phẩm',
      type: 'singleSelect',
      width: 200,
      sortable: false,
      editable: true,
      valueOptions: [
        {
          label: NO_BIOPRODUCT,
          value: undefined as unknown as string,
        },
      ].concat(
        bioProducts.map((item) => ({
          value: item._id,
          label: item.name,
        })),
      ),
    },
    {
      field: 'shouldDisplayWithChildren',
      type: 'boolean',
      headerName: 'Luôn hiển thị',
      width: 80,
      sortable: false,
      editable: true,
    },
    {
      field: 'printFormId',
      type: 'singleSelect',
      headerName: 'Form In KQ',
      width: 150,
      sortable: false,
      editable: true,
      valueOptions: [
        {
          label: NO_PRINTFORM,
          value: undefined as unknown as string,
        },
      ].concat(
        printForms.map((printForm) => ({
          value: printForm._id,
          label: printForm.name,
        })),
      ),
    },
  ]
}
