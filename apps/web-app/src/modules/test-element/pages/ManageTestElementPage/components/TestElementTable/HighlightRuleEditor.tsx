import * as React from 'react'
import { PatientCategory } from '@diut/bathanghai-common'
import { Box, Button } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import { HighlightRuleDto, TestElementResponseDto } from 'src/api/test-element'
import { CrudTable } from 'src/common/components/CrudTable'
import { SideAction } from 'src/common/components/SideAction'

const patientCategories = {
  [PatientCategory.Any]: 'Tất cả',
  [PatientCategory.Boy]: 'Bé trai',
  [PatientCategory.Girl]: 'Bé gái',
  [PatientCategory.Man]: 'Nam',
  [PatientCategory.Woman]: 'Nữ',
  [PatientCategory.Pregnant]: 'Thai phụ',
}

type HighlightRuleDtoWithId = HighlightRuleDto & {
  id: string
}

const columns: GridColDef<HighlightRuleDtoWithId>[] = [
  {
    field: 'category',
    headerName: 'Phân loại',
    type: 'singleSelect',
    minWidth: 150,
    sortable: false,
    editable: true,
    valueOptions: Object.keys(patientCategories).map((category) => ({
      value: category,
      label: patientCategories[category as PatientCategory],
    })),
    valueFormatter: ({ value }) => patientCategories[value as PatientCategory],
  },
  {
    field: 'min',
    headerName: 'Min',
    type: 'number',
    width: 100,
    sortable: false,
    editable: true,
  },
  {
    field: 'max',
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
  },
  {
    field: 'note',
    headerName: 'Tham khảo',
    minWidth: 100,
    flex: 1,
    sortable: false,
    editable: true,
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

interface HighlightRuleEditorProps {
  element: TestElementResponseDto
  onClose: Function
  onSubmit: (highlightRules: HighlightRuleDto[]) => void
  isSubmitting: boolean
}

export function HighlightRuleEditor({
  element,
  onClose,
  onSubmit,
  isSubmitting,
}: HighlightRuleEditorProps) {
  const [items, setItems] = React.useState<HighlightRuleDtoWithId[]>([])

  React.useEffect(() => {
    if (element?.highlightRules !== undefined) {
      setItems(
        element.highlightRules.map((rule) => ({
          id: JSON.stringify(rule),
          ...rule,
        })),
      )
    }
  }, [element?.highlightRules])

  const handleSubmit = () => {
    onSubmit(
      items.map((rule) => ({
        ...rule,
        id: undefined,
        defaultChecked: rule.defaultChecked ?? false,
      })),
    )
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <SideAction
      fullWidth
      open={element !== null}
      onClose={onClose}
      title={element?.name}
      disableClickOutside={isSubmitting}
    >
      <Box sx={{ height: '100%' }}>
        <CrudTable
          items={items}
          itemIdField="id"
          fieldColumns={columns}
          onItemCreate={(item) => {
            setItems((items) => [
              ...items,
              { ...item, id: JSON.stringify(item) },
            ])
          }}
          onItemUpdate={(item) => {
            setItems((items) => [
              { ...item, id: JSON.stringify(item) },
              ...items.filter((rule) => rule.id !== item.id),
            ])
          }}
          onItemDelete={(item) => {
            setItems((items) => items.filter((rule) => rule.id !== item.id))
          }}
        />
        <Box>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Lưu
          </Button>
          <Button sx={{ mt: 2, mx: 1 }} color="primary" onClick={handleCancel}>
            Huỷ
          </Button>
        </Box>
      </Box>
    </SideAction>
  )
}
