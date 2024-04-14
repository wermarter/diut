import { PatientCategory, PatientCategoryValues } from '@diut/hcdc'
import { GridColDef } from '@mui/x-data-grid'

import { TestElementNormalRuleDto } from 'src/infra/api/access-service/test-element'

const patientCategoryDisplayText = {
  [PatientCategory.Any]: 'Tất cả',
  [PatientCategory.YoungMale]: 'Bé trai',
  [PatientCategory.YoungFemale]: 'Bé gái',
  [PatientCategory.MatureMale]: 'Nam',
  [PatientCategory.MatureFemale]: 'Nữ',
  [PatientCategory.Pregnant]: 'Thai phụ',
}

export const normalRuleColumns: GridColDef<TestElementNormalRuleDto>[] = [
  {
    field: 'category',
    headerName: 'Phân loại',
    type: 'singleSelect',
    minWidth: 150,
    sortable: false,
    editable: true,
    valueOptions: PatientCategoryValues.map((category) => ({
      value: category,
      label: patientCategoryDisplayText[category],
    })),
  },
  {
    field: 'normalLowerBound',
    headerName: 'Min',
    type: 'number',
    width: 100,
    sortable: false,
    editable: true,
  },
  {
    field: 'normalUpperBound',
    headerName: 'Max',
    type: 'number',
    width: 100,
    sortable: false,
    editable: true,
  },
  {
    field: 'normalValue',
    headerName: 'So sánh',
    minWidth: 100,
    flex: 1,
    sortable: false,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Mô tả',
    minWidth: 100,
    flex: 1,
    sortable: false,
    editable: true,
    valueGetter: ({ value }) => {
      return value ?? ''
    },
  },
  {
    field: 'note',
    headerName: 'Tham khảo',
    minWidth: 100,
    flex: 1,
    sortable: false,
    editable: true,
    valueGetter: ({ value }) => {
      return value ?? ''
    },
  },
  {
    field: 'defaultChecked',
    type: 'boolean',
    headerName: 'Mặc định',
    minWidth: 80,
    sortable: false,
    editable: true,
    valueGetter: ({ value }) => {
      return value ?? false
    },
  },
]
