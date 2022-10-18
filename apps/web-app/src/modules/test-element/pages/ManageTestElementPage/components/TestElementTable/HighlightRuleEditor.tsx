import { PatientCategory } from '@diut/common'
import { Button } from '@mui/material'

import { HighlightRuleDto, TestElementResponseDto } from 'src/api/test-element'
import { SideAction } from 'src/common/components/SideAction'

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
  const handleSubmit = () => {
    onSubmit([
      {
        category: PatientCategory.Boy,
        min: 999,
        max: 888,
        normalValue: 'Pos',
        description: '777',
      },
    ])
    onClose()
  }

  return (
    <SideAction
      open={element !== null}
      onClose={onClose}
      title={`Giá trị tham chiếu: [${element?.test.name}] ${element?.name} `}
      disableClickOutside={isSubmitting}
    >
      Em là tham chiếu {JSON.stringify(element?.highlightRules)}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </SideAction>
  )
}
