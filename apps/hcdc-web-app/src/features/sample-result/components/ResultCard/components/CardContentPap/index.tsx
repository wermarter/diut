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
import { useState } from 'react'

import { CardContentCommonProps } from '../utils'
import { SampleResultTestElementResponseDto } from 'src/infra/api/access-service/sample'
import { ImageCropUpload } from '../ImageCropUpload'

export const CardContentPap = (props: CardContentCommonProps) => {
  const { elements } = props.resultRes
  const [imagePaths, setImagePaths] = useState<
    null | [string | undefined, string | undefined]
  >(null)

  const firstRowElements = elements.slice(0, 2)
  const aboveTitleCol1Elements = [elements.at(2)!, elements.at(4)!]
  const aboveTitleCol2Elements = [elements.at(3)!, elements.at(5)!]
  const belowTitleElements = elements.slice(6, 11)
  const visinhElements = elements.slice(11, 17)
  const tbgaiElements = elements.slice(17, 23)
  const khacElements = elements.slice(23, 27)
  const tuyenElements = elements.slice(27, 31)
  const resultElement = elements.at(31)!
  const resultElementState = props.resultState[resultElement.testElementId]

  const leftImagePathElement = elements.at(32)!
  const rightImagePathElement = elements.at(33)!

  const generateCheckboxes = (
    elements: SampleResultTestElementResponseDto[],
    disableFirst = false,
  ) => {
    return elements.map((element, index) => {
      const elementState = props.resultState[element.testElement?._id!]
      if (!elementState) return null

      const normalRule =
        element.testElement?.normalRules.find(
          ({ category }) => category === props.patientCategory,
        ) ?? element.testElement?.normalRules[0]

      return (
        <FormControlLabel
          key={element.testElementId}
          disabled={props.isDisabled || (index === 0 && disableFirst === true)}
          control={
            <Checkbox
              disableRipple
              color="primary"
              checked={
                elementState.isAbnormal ?? normalRule?.defaultChecked ?? false
              }
              onChange={(e) => {
                props.setResultState(element.testElementId, {
                  isAbnormal: e.target.checked,
                })
              }}
            />
          }
          label={element.testElement?.name}
        />
      )
    })
  }

  const generateTextFields = (
    elements: SampleResultTestElementResponseDto[],
  ) => {
    return elements.map((element) => {
      const elementState = props.resultState[element.testElement?._id!]
      if (!elementState) return null

      return (
        <TextField
          key={element.testElementId}
          label={element.testElement?.name}
          name={element.testElementId}
          disabled={props.isDisabled}
          fullWidth
          variant="outlined"
          value={elementState.value ?? ''}
          onChange={(e) => {
            const value = e.target.value
            props.setResultState(element.testElementId, {
              value,
            })
          }}
        />
      )
    })
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
        {generateTextFields(firstRowElements)}
      </Box>
      <Paper
        sx={{ display: 'flex', justifyContent: 'space-between', p: 1, my: 1 }}
        variant="outlined"
      >
        <FormGroup>
          {generateCheckboxes(aboveTitleCol1Elements, true)}
        </FormGroup>
        <FormGroup>
          {generateCheckboxes(aboveTitleCol2Elements, true)}
        </FormGroup>
      </Paper>
      <Paper sx={{ p: 1, mt: 1 }} variant="outlined">
        {generateCheckboxes(belowTitleElements)}
      </Paper>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
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
        <Box sx={{ flexGrow: 1 }}>
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
      <Box sx={{ display: 'flex', mt: 1 }}>
        <Checkbox
          disableRipple
          disabled={props.isDisabled}
          color="primary"
          checked={resultElementState?.isAbnormal ?? false}
          onChange={(e) => {
            props.setResultState(resultElement.testElementId, {
              isAbnormal: e.target.checked,
            })
          }}
        />
        <TextField
          error={resultElementState?.isAbnormal ?? false}
          key={resultElement.testElementId}
          label={resultElement.testElement?.name}
          name={resultElement.testElementId}
          disabled={props.isDisabled}
          fullWidth
          variant="outlined"
          value={resultElementState?.value ?? ''}
          onChange={(e) => {
            props.setResultState(resultElement.testElementId, {
              value: e.target.value,
            })
          }}
        />
        <Button
          variant="outlined"
          sx={{ ml: 1 }}
          color="secondary"
          disabled={props.isDisabled}
          onClick={() => {
            setImagePaths([
              leftImagePathElement.value,
              rightImagePathElement.value,
            ])
          }}
        >
          Ảnh
        </Button>
      </Box>
      <ImageCropUpload
        imagePaths={imagePaths}
        onClose={() => {
          setImagePaths(null)
        }}
        title={props.resultRes.test?.name}
        onSubmit={(imagePaths) => {
          imagePaths[0] &&
            props.setResultState(leftImagePathElement.testElementId, {
              value: imagePaths[0],
            })
          imagePaths[1] &&
            props.setResultState(rightImagePathElement.testElementId, {
              value: imagePaths[1],
            })
        }}
        sampleId={props.sampleId}
        leftElementId={leftImagePathElement.testElementId}
        rightElementId={rightImagePathElement.testElementId}
        leftImageExisted={leftImagePathElement.value?.length > 0}
        rightImageExisted={rightImagePathElement.value?.length > 0}
      />
    </>
  )
}
