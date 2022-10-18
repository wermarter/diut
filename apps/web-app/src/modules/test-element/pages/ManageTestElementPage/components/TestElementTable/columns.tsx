import { PatientCategory } from '@diut/common'
import { GridColumns, GridValueSetterParams } from '@mui/x-data-grid'

import { TestResponseDto } from 'src/api/test'
import { HighlightRuleDto, TestElementResponseDto } from 'src/api/test-element'
import { NEW_ID_VALUE } from 'src/common/components/CrudTable/components/CrudToolbar'

export const NO_MIN = -1
export const NO_MAX = -1
export const NO_NORMAL_VALUE = '---'
export const NO_DESCRIPTION = '---'

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
    {
      field: 'anyMin',
      headerName: 'Min',
      type: 'number',
      minWidth: 100,
      sortable: false,
      editable: true,
      valueGetter: ({ row }) => {
        const rule = row.highlightRules?.[0] ?? {}
        if (rule.category !== PatientCategory.Any) {
          return NO_MIN
        }

        return rule.min
      },
      valueSetter: simpleHighlightRuleSetter('min', NO_MIN),
    },
    {
      field: 'anyMax',
      headerName: 'Max',
      type: 'number',
      minWidth: 100,
      sortable: false,
      editable: true,
      valueGetter: ({ row }) => {
        const rule = row.highlightRules?.[0] ?? {}
        if (rule.category !== PatientCategory.Any) {
          return NO_MAX
        }

        return rule.max
      },
      valueSetter: simpleHighlightRuleSetter('max', NO_MAX),
    },
    {
      field: 'anyNormal',
      headerName: 'Bình thường',
      minWidth: 120,
      sortable: false,
      editable: true,
      valueGetter: ({ row }) => {
        const rule = row.highlightRules?.[0] ?? {}

        if (rule.category !== PatientCategory.Any) {
          return NO_NORMAL_VALUE
        }

        return rule.normalValue
      },
      valueSetter: simpleHighlightRuleSetter('normalValue', NO_NORMAL_VALUE),
    },
    {
      field: 'anyDescription',
      headerName: 'Tham chiếu',
      minWidth: 200,
      sortable: false,
      editable: true,
      valueGetter: ({ row }) => {
        const rule = row.highlightRules?.[0] ?? {}
        if (rule.category !== PatientCategory.Any) {
          return NO_DESCRIPTION
        }

        return rule.description
      },
      valueSetter: simpleHighlightRuleSetter('description', NO_DESCRIPTION),
    },
  ]
}

function simpleHighlightRuleSetter(
  fieldName: keyof HighlightRuleDto,
  emptyConst: any
) {
  return ({ value, row }: GridValueSetterParams<TestElementResponseDto>) => {
    const originalRule = row.highlightRules?.[0] ?? {}

    if (row._id === NEW_ID_VALUE && value === emptyConst) {
      return row
    }

    if (row._id === NEW_ID_VALUE && value !== emptyConst) {
      return {
        ...row,
        highlightRules: [
          {
            ...originalRule,
            category: PatientCategory.Any,
            [fieldName]: value,
          },
        ],
      }
    }
    if (value === emptyConst || originalRule.category !== PatientCategory.Any) {
      return row
    }

    return {
      ...row,
      highlightRules: [
        {
          ...originalRule,
          [fieldName]: value,
        },
      ],
    }
  }
}
