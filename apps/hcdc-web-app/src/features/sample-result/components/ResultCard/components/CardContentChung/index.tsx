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
import { CardContentCommonProps } from '../utils'

export const CardContentChung = (props: CardContentCommonProps) => {
  return (
    <Table size="small">
      <TableBody>
        {props.resultRes.elements.map((element) => {
          const elementState = props.resultState[element.testElement?._id!]
          if (!elementState) return null

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
