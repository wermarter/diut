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
import { DATETIME_FORMAT } from '@diut/common'
import { NormalRule, isTestElementValueNormal } from '@diut/hcdc'

import { CardContentCommonProps } from '../utils'

export const CardContentTD = (props: CardContentCommonProps) => {
  return (
    <Table size="small">
      <TableBody>
        {props.resultRes.elements.map((element, elementIndex) => {
          const elementState = props.resultState[element.testElement?._id!]
          if (!elementState) return null

          if (elementIndex === 0) {
            return (
              <TableRow key={element.testElement?._id!}>
                <TableCell padding="checkbox" />
                <TableCell align="left" width="200px">
                  <Typography
                    sx={{
                      color: props.isDisabled ? '#CCC' : 'inherit',
                    }}
                  >
                    {element.testElement?.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Input
                    fullWidth
                    disabled={props.isDisabled}
                    autoComplete="off"
                    type="datetime-local"
                    value={format(
                      elementState.value?.length > 0
                        ? new Date(elementState.value)
                        : new Date(),
                      'yyyy-MM-dd HH:mm',
                    )}
                    onChange={(e) => {
                      console.log(e.target.value)
                      props.setResultState(element.testElement?._id!, {
                        value: e.target.value,
                        isAbnormal: false,
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

          const normalRule =
            element.testElement?.normalRules.find(
              ({ category }) => category === props.patientCategory,
            ) ?? element.testElement?.normalRules[0]

          return (
            <TableRow key={element.testElement?._id!}>
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
                    props.setResultState(element.testElement?._id!, {
                      isAbnormal: e.target.checked,
                    })
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
                  {element.testElement?.name}
                </Typography>
              </TableCell>
              <TableCell width="150px">
                <TextField
                  name={element.testElement?._id!}
                  disabled={props.isDisabled}
                  fullWidth
                  variant="standard"
                  value={elementState.value ?? ''}
                  onChange={(e) => {
                    const value = e.target.value
                    const isNormal =
                      value.length > 0 &&
                      isTestElementValueNormal(normalRule as NormalRule, value)

                    props.setResultState(element.testElement?._id!, {
                      value,
                      isAbnormal: !isNormal,
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
