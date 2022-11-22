import { PrintForm } from '@diut/common'
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'

import { BioProductResponseDto } from 'src/api/bio-product'
import { TestResultDto } from 'src/api/sample'
import { TestCategoryResponseDto } from 'src/api/test-category'
import { HighlightRuleDto, TestElementResponseDto } from 'src/api/test-element'
import { UserResponseDto } from 'src/api/user'
import { checkHighlight } from '../utils'

interface CommonResultCardProps {
  currentTestInfo: {
    result: TestResultDto | undefined
    _id: string
    createdAt: string
    updatedAt: string
    category: TestCategoryResponseDto
    bioProduct?: BioProductResponseDto | undefined
    name: string
    index: number
    printForm: PrintForm
    elements: TestElementResponseDto[]
  }
  currentTestState: {
    author: UserResponseDto
    isLocked: boolean
  }
  elementState: {
    [elementId: string]: {
      checked: boolean
      value: string
    }
  }
  setElementState: (
    elementId: string,
    { checked, value }: { checked: boolean; value: string }
  ) => void
  getHighlightRule: (highlightRules: HighlightRuleDto[]) => HighlightRuleDto
}

export const CommonResultCard = ({
  currentTestState,
  currentTestInfo,
  elementState,
  setElementState,
  getHighlightRule,
}: CommonResultCardProps) => {
  return (
    <Table size="small">
      <TableBody>
        {currentTestInfo.elements.map((currentElementInfo) => {
          const currentElementState = elementState[currentElementInfo._id] ?? {}
          const highlightRule = getHighlightRule(
            currentElementInfo.highlightRules
          )

          return (
            <TableRow key={currentElementInfo._id}>
              <TableCell padding="checkbox">
                <Checkbox
                  tabIndex={-1}
                  disabled={currentTestState.isLocked}
                  disableRipple
                  color="secondary"
                  checked={
                    currentElementState.checked ??
                    highlightRule.defaultChecked ??
                    false
                  }
                  onChange={(e) => {
                    setElementState(currentElementInfo._id, {
                      checked: e.target.checked,
                      value: currentElementState.value,
                    })
                  }}
                />
              </TableCell>
              <TableCell align="left" width="250px">
                <Typography
                  sx={{
                    color: currentTestState.isLocked ? '#CCC' : 'inherit',
                    fontWeight: currentElementState.checked ? 'bold' : 'normal',
                  }}
                >
                  {currentElementInfo.name}
                </Typography>
              </TableCell>
              <TableCell width="150px">
                <TextField
                  name={currentElementInfo._id}
                  disabled={currentTestState.isLocked}
                  fullWidth
                  variant="standard"
                  value={currentElementState.value ?? ''}
                  onChange={(e) => {
                    const newValue = e.target.value
                    const checked =
                      newValue.length > 0 &&
                      checkHighlight(highlightRule, newValue)

                    setElementState(currentElementInfo._id, {
                      checked,
                      value: newValue,
                    })
                  }}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
