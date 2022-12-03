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

import { checkHighlight } from '../utils'
import { ResultCardProps } from './utils'

export const TDResultCard = ({
  currentTestState,
  currentTestInfo,
  elementState,
  setElementState,
  getHighlightRule,
}: ResultCardProps) => {
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
