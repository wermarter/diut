import { PatientCategory } from '@diut/common'
import { GridColumns } from '@mui/x-data-grid'

import { TestResponseDto } from 'src/api/test'
import { TestElementResponseDto } from 'src/api/test-element'

export const NO_MIN = -1
export const NO_MAX = -1
export const NO_NORMAL_VALUE = '---'
export const NO_DESCRIPTION = '---'
export const NO_NOTE = '---'

export function useTestElementColumns(
  test: TestResponseDto[]
): GridColumns<TestElementResponseDto> {
  return [
    {
      field: 'test',
      headerName: 'Tên XN',
      type: 'singleSelect',
      minWidth: 250,
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
      minWidth: 70,
      sortable: false,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Tên thành phần',
      minWidth: 200,
      flex: 1,
      sortable: false,
      editable: true,
    },
    {
      field: 'isParent',
      type: 'boolean',
      headerName: 'TP lớn',
      minWidth: 80,
      flex: 1,
      sortable: false,
      editable: true,
      valueGetter: ({ value }) => {
        return value ?? false
      },
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
      headerName: 'So sánh',
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
    {
      field: 'anyNote',
      headerName: 'Tham khảo',
      minWidth: 100,
      sortable: false,
      editable: true,
      valueGetter: ({ row }) => {
        const rule = row.highlightRules?.[0] ?? {}
        if (rule.category !== PatientCategory.Any) {
          return NO_NOTE
        }

        return rule.note
      },
      valueFormatter: ({ value }) => {
        if (value === NO_NOTE) {
          return ''
        }
      },
    },
    {
      field: 'anyDefaultChecked',
      type: 'boolean',
      headerName: 'Mặc định',
      width: 80,
      sortable: false,
      editable: true,
      valueGetter: ({ row }) => {
        const rule = row.highlightRules?.[0] ?? {}
        if (rule.category !== PatientCategory.Any) {
          return false
        }

        return rule.defaultChecked ?? false
      },
    },
  ]
}
