import { NormalRule, isTestElementValueNormal } from '@diut/hcdc'
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'

import { CardContentProps } from '../utils'

export const CardContentChung = (props: CardContentProps) => {
  return (
    <Table size="small">
      <TableBody>
        {props.testResult.elements.map((testElementResult) => {
          const elementState = props.result[testElementResult.testElement?._id!]
          if (!elementState) return null

          const normalRule = testElementResult.testElement?.normalRules.find(
            ({ category }) => category === props.patientCategory,
          )

          return (
            <TableRow key={testElementResult.testElement?._id!}>
              <TableCell padding="checkbox">
                <Checkbox
                  tabIndex={-1}
                  disabled={props.isDisabled}
                  disableRipple
                  color="secondary"
                  checked={
                    elementState.isAbnormal ??
                    normalRule?.defaultChecked ??
                    false
                  }
                  onChange={(e) => {
                    props.setElementResult(
                      testElementResult.testElement?._id!,
                      {
                        isAbnormal: e.target.checked,
                        value: elementState.value,
                      },
                    )
                  }}
                />
              </TableCell>
              <TableCell align="left" width="250px">
                <Typography
                  sx={{
                    color: props.isDisabled ? '#CCC' : 'inherit',
                    fontWeight: elementState.isAbnormal ? 'bold' : 'normal',
                  }}
                >
                  {testElementResult.testElement?.name}
                </Typography>
              </TableCell>
              <TableCell width="150px">
                <TextField
                  name={testElementResult.testElement?._id!}
                  disabled={props.isDisabled}
                  fullWidth
                  variant="standard"
                  value={elementState.value ?? ''}
                  onChange={(e) => {
                    const value = e.target.value
                    const isNormal =
                      value.length > 0 &&
                      isTestElementValueNormal(normalRule as NormalRule, value)

                    props.setElementResult(
                      testElementResult.testElement?._id!,
                      {
                        value,
                        isAbnormal: !isNormal,
                      },
                    )
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
