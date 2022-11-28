import { PrintForm } from '@diut/common'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  TextField,
} from '@mui/material'

import { BioProductResponseDto } from 'src/api/bio-product'
import { TestResultDto } from 'src/api/sample'
import { TestCategoryResponseDto } from 'src/api/test-category'
import { HighlightRuleDto, TestElementResponseDto } from 'src/api/test-element'
import { UserResponseDto } from 'src/api/user'

interface PapsmearResultCardProps {
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

export const PapsmearResultCard = ({
  currentTestState,
  currentTestInfo,
  elementState,
  setElementState,
  getHighlightRule,
}: PapsmearResultCardProps) => {
  const { elements } = currentTestInfo

  const firstRowElements = elements.slice(0, 2)
  const aboveTitleCol1Elements = [elements.at(2)!, elements.at(4)!]
  const aboveTitleCol2Elements = [elements.at(3)!, elements.at(5)!]
  const belowTitleElements = elements.slice(6, 11)
  const visinhElements = elements.slice(11, 17)
  const tbgaiElements = elements.slice(17, 23)
  const khacElements = elements.slice(23, 27)
  const tuyenElements = elements.slice(27, 31)
  const resultElement = [elements.at(31)!]

  const generateCheckboxes = (elements: TestElementResponseDto[]) => {
    return elements.map((currentElementInfo) => {
      const currentElementState = elementState[currentElementInfo._id] ?? {}
      const highlightRule = getHighlightRule(currentElementInfo.highlightRules)

      return (
        <FormControlLabel
          disabled={currentTestState.isLocked}
          control={
            <Checkbox
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
                  value: '',
                })
              }}
            />
          }
          label={currentElementInfo.name}
        />
      )
    })
  }

  const generateTextFields = (elements: TestElementResponseDto[]) => {
    return elements.map((currentElementInfo) => {
      const currentElementState = elementState[currentElementInfo._id] ?? {}
      return (
        <TextField
          label={currentElementInfo.name}
          name={currentElementInfo._id}
          disabled={currentTestState.isLocked}
          fullWidth
          variant="standard"
          value={currentElementState.value ?? ''}
          onChange={(e) => {
            setElementState(currentElementInfo._id, {
              checked: false,
              value: e.target.value,
            })
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )
    })
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {generateTextFields(firstRowElements)}
      </Box>
      <Paper
        sx={{ display: 'flex', justifyContent: 'space-between', p: 1, my: 1 }}
        variant="outlined"
      >
        <FormGroup>{generateCheckboxes(aboveTitleCol1Elements)}</FormGroup>
        <FormGroup>{generateCheckboxes(aboveTitleCol2Elements)}</FormGroup>
      </Paper>
      <Paper sx={{ p: 1, my: 1 }} variant="outlined">
        {generateCheckboxes(belowTitleElements)}
      </Paper>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <Paper sx={{ p: 1, my: 1, mr: 1 }} variant="outlined">
            <FormGroup>
              <FormLabel>TB Vi sinh:</FormLabel>
              {generateCheckboxes(visinhElements)}
            </FormGroup>
          </Paper>
          <Paper sx={{ p: 1, mt: 1, mr: 1 }} variant="outlined">
            <FormGroup>
              <FormLabel>TB Khác:</FormLabel>
              {generateCheckboxes(khacElements)}
            </FormGroup>
          </Paper>
        </Box>
        <Box>
          <Paper sx={{ p: 1, my: 1 }} variant="outlined">
            <FormGroup>
              <FormLabel>TB Gai:</FormLabel>
              {generateCheckboxes(tbgaiElements)}
            </FormGroup>
          </Paper>
          <Paper sx={{ p: 1, mt: 1 }} variant="outlined">
            <FormGroup>
              <FormLabel>TB Tuyến:</FormLabel>
              {generateCheckboxes(tuyenElements)}
            </FormGroup>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Button
          variant="outlined"
          sx={{ mr: 2 }}
          disabled={currentTestState.isLocked}
          onClick={() => {}}
        >
          Hình Ảnh
        </Button>
        {generateTextFields(resultElement)}
      </Box>
    </>
  )
}
