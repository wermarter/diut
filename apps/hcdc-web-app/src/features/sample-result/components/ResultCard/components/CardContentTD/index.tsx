import {
  NormalRule,
  formatNormalRuleDisplayText,
  isTestElementValueNormal,
} from '@diut/hcdc'
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
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckIcon from '@mui/icons-material/Check'
import { format } from 'date-fns'
import { CardContentCommonProps } from '../utils'

export const CardContentTD = (props: CardContentCommonProps) => {
  const shouldObscure = props.isDisabled && !props.isExternal

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
                      color: shouldObscure ? '#CCC' : 'inherit',
                    }}
                  >
                    {element.testElement?.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Input
                    fullWidth
                    disabled={shouldObscure}
                    autoComplete="off"
                    type="datetime-local"
                    value={format(
                      elementState.value?.length > 0
                        ? new Date(elementState.value)
                        : new Date(),
                      'yyyy-MM-dd HH:mm',
                    )}
                    onChange={(e) => {
                      if (props.isExternal) {
                        return
                      }

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

          const description =
            normalRule?.description ||
            formatNormalRuleDisplayText(normalRule as NormalRule)

          return (
            <TableRow key={element.testElement?._id!}>
              <TableCell padding="checkbox">
                <Checkbox
                  icon={
                    props.isExternal ? (
                      <CheckIcon color="success" />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    )
                  }
                  checkedIcon={<PriorityHighIcon color="error" />}
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
                    color: shouldObscure ? '#CCC' : 'inherit',
                    fontWeight: elementState.isAbnormal ? 'bold' : 'normal',
                  }}
                >
                  {element.testElement?.name}
                </Typography>
              </TableCell>
              <TableCell width="150px">
                <TextField
                  name={element.testElement?._id!}
                  disabled={shouldObscure}
                  fullWidth
                  variant="standard"
                  value={elementState.value ?? ''}
                  onChange={(e) => {
                    if (props.isExternal) {
                      return
                    }

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
              {props.isExternal && description.length > 0 && (
                <TableCell
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                  }}
                >
                  <Typography fontStyle={'italic'}>{description}</Typography>
                </TableCell>
              )}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
