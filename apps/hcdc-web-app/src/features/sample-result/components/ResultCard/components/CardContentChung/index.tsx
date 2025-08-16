import {
  NormalRule,
  formatNormalRuleDisplayText,
  isTestElementValueNormal,
} from '@diut/hcdc'
import {
  Checkbox,
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
import { CardContentCommonProps } from '../utils'

export const CardContentChung = (props: CardContentCommonProps) => {
  const shouldObscure = props.isDisabled && !props.isExternal

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
              <TableCell align="left">
                <Typography
                  sx={{
                    color: shouldObscure ? '#CCC' : 'inherit',
                    fontWeight: elementState.isAbnormal ? 'bold' : 'normal',
                  }}
                >
                  {element.testElement?.name}
                </Typography>
              </TableCell>
              <TableCell sx={{ minWidth: '100px' }}>
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
