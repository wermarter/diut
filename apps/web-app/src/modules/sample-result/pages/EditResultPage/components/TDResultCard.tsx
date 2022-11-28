import { PrintForm } from '@diut/common'
import {
  Checkbox,
  Input,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'

import { BioProductResponseDto } from 'src/api/bio-product'
import { TestResultDto } from 'src/api/sample'
import { TestCategoryResponseDto } from 'src/api/test-category'
import { HighlightRuleDto, TestElementResponseDto } from 'src/api/test-element'
import { UserResponseDto } from 'src/api/user'
import { checkHighlight } from '../utils'

interface TDResultCardProps {
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

export const TDResultCard = ({
  currentTestState,
  currentTestInfo,
  elementState,
  setElementState,
  getHighlightRule,
}: TDResultCardProps) => {
  return (
    <Table size="small">
      <TableBody>
        {currentTestInfo.elements.map((currentElementInfo, elementIndex) => {
          const currentElementState = elementState[currentElementInfo._id] ?? {}

          if (elementIndex === 0) {
            return (
              <TableRow key={currentElementInfo._id}>
                <TableCell padding="checkbox" />
                <TableCell align="left" width="200px">
                  <Typography
                    sx={{
                      color: currentTestState.isLocked ? '#CCC' : 'inherit',
                    }}
                  >
                    {currentElementInfo.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Input
                    fullWidth
                    disabled={currentTestState.isLocked}
                    autoComplete="off"
                    type="datetime-local"
                    value={format(
                      currentElementState.value?.length > 0
                        ? new Date(currentElementState.value)
                        : new Date(),
                      'yyyy-MM-dd HH:mm'
                    )}
                    onChange={(e) => {
                      setElementState(currentElementInfo._id, {
                        value: e.target.value,
                        checked: false,
                      })
                    }}
                    inputProps={{
                      max: format(Date.now(), 'yyyy-MM-dd HH:mm'),
                    }}
                  />
                </TableCell>
              </TableRow>
            )
          }

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
