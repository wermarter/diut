import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'

import { checkHighlight } from '../utils'
import { ResultCardProps } from './utils'

export const CommonResultCard = ({
  currentTestState,
  currentTestInfo,
  elementState,
  setElementState,
  getHighlightRule,
}: ResultCardProps) => {
  return (
    <Table size="small">
      <TableBody>
        {currentTestInfo.elements.map((currentElementInfo) => {
          const currentElementState = elementState[currentElementInfo._id] ?? {}
          const highlightRule = getHighlightRule(
            currentElementInfo.highlightRules,
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
