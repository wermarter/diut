import { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'

import {
  TestElementNormalRuleDto,
  TestElementResponseDto,
} from 'src/infra/api/access-service/test-element'
import { CrudTable } from 'src/components/table'
import { SideAction } from 'src/components/ui/SideAction'
import { TestElementNormalRuleDtoWithId, normalRuleColumns } from './columns'

type NormalRuleEditorProps = {
  element: TestElementResponseDto | null
  onClose: Function
  onSubmit: (normalRules: TestElementNormalRuleDto[]) => void
  isSubmitting: boolean
}

export function NormalRuleEditor(props: NormalRuleEditorProps) {
  const [items, setItems] = useState<TestElementNormalRuleDtoWithId[]>([])

  useEffect(() => {
    if (props.element?.normalRules) {
      setItems(
        props.element?.normalRules.map((rule) => ({
          id: JSON.stringify(rule),
          ...rule,
        })),
      )
    }
  }, [props.element?.normalRules])

  const handleSubmit = () => {
    props.onSubmit(
      items.map((rule) => ({
        ...rule,
        id: undefined,
        defaultChecked: rule.defaultChecked ?? false,
      })),
    )
    props.onClose()
  }

  const handleCancel = () => {
    props.onClose()
  }

  return (
    <SideAction
      fullWidth
      open={props.element != null}
      onClose={props.onClose}
      title={props.element?.name ?? ''}
      disableClickOutside={props.isSubmitting}
    >
      <Box sx={{ height: '100%', m: 2 }}>
        <CrudTable
          items={items}
          itemIdField="id"
          fieldColumns={normalRuleColumns}
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
