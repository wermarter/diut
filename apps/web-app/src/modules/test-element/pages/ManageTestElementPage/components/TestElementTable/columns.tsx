import { PatientCategory } from '@diut/common'
import { GridColumns } from '@mui/x-data-grid'

import { TestResponseDto } from 'src/api/test'
import { TestElementResponseDto } from 'src/api/test-element'

export const NO_MIN = -1
export const NO_MAX = -1
export const NO_NORMAL_VALUE = '---'
export const NO_DESCRIPTION = '---'

export function useTestElementColumns(
  test: TestResponseDto[]
): GridColumns<TestElementResponseDto> {
  return [
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
      field: 'index',
      headerName: 'Thứ tự',
      type: 'number',
      minWidth: 100,
      sortable: false,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Tên thành phần',
      minWidth: 300,
      flex: 1,
      sortable: false,
      editable: true,
    },
    {
      field: 'unit',
      headerName: 'Đơn vị',
      minWidth: 80,
      sortable: false,
      editable: true,
    },
    {
      field: 'anyMin',
      headerName: 'Min',
      type: 'number',
      minWidth: 80,
      sortable: false,
      editable: true,
      valueGetter: ({ row }) => {
        const rule = row.highlightRules?.[0] ?? {}
        if (rule.category !== PatientCategory.Any) {
          return NO_MIN
        }

        return rule.min
      },
      valueFormatter: ({ value }) => {
        if (value === NO_MIN) {
          return ''
        }
      },
    },
    {
      field: 'anyMax',
      headerName: 'Max',
      type: 'number',
      minWidth: 80,
      sortable: false,
      editable: true,
      valueGetter: ({ row }) => {
        const rule = row.highlightRules?.[0] ?? {}
        if (rule.category !== PatientCategory.Any) {
          return NO_MAX
        }

        return rule.max
      },
      valueFormatter: ({ value }) => {
        if (value === NO_MAX) {
          return ''
        }
      },
    },
    {
      field: 'anyNormal',
      headerName: 'Bình thường',
      minWidth: 80,
      sortable: false,
      editable: true,
      valueGetter: ({ row }) => {
        const rule = row.highlightRules?.[0] ?? {}

        if (rule.category !== PatientCategory.Any) {
          return NO_NORMAL_VALUE
        }

        return rule.normalValue
      },
      valueFormatter: ({ value }) => {
        if (value === NO_NORMAL_VALUE) {
          return ''
        }
      },
    },
    {
      field: 'anyDescription',
      headerName: 'Mô tả',
      minWidth: 100,
      sortable: false,
      editable: true,
      valueGetter: ({ row }) => {
        const rule = row.highlightRules?.[0] ?? {}
        if (rule.category !== PatientCategory.Any) {
          return NO_DESCRIPTION
        }

        return rule.description
      },
      valueFormatter: ({ value }) => {
        if (value === NO_DESCRIPTION) {
          return ''
        }
      },
    },
  ]
}
