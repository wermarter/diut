import { PrintForm } from '@diut/common'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Slider,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload'

import { BioProductResponseDto } from 'src/api/bio-product'
import {
  TestResultDto,
  useSampleDownloadFileMutation,
  useSampleUploadFileMutation,
} from 'src/api/sample'
import { TestCategoryResponseDto } from 'src/api/test-category'
import { HighlightRuleDto, TestElementResponseDto } from 'src/api/test-element'
import { UserResponseDto } from 'src/api/user'
import { SideAction } from 'src/common/components/SideAction'
import { readFileToURL } from 'src/common/utils'
import Cropper, { Point } from 'react-easy-crop'

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
  sampleId: string
}

export const PapsmearResultCard = ({
  currentTestState,
  currentTestInfo,
  elementState,
  setElementState,
  getHighlightRule,
  sampleId,
}: PapsmearResultCardProps) => {
  const { elements } = currentTestInfo
  const [shouldShowImage, setShouldShowImage] = useState(false)

  const firstRowElements = elements.slice(0, 2)
  const aboveTitleCol1Elements = [elements.at(2)!, elements.at(4)!]
  const aboveTitleCol2Elements = [elements.at(3)!, elements.at(5)!]
  const belowTitleElements = elements.slice(6, 11)
  const visinhElements = elements.slice(11, 17)
  const tbgaiElements = elements.slice(17, 23)
  const khacElements = elements.slice(23, 27)
  const tuyenElements = elements.slice(27, 31)
  const resultElement = [elements.at(31)!]
  const imagePathElementId = elements.at(32)?._id!
  const cropMetadataElementId = elements.at(33)?._id!

  const imagePath = elementState[imagePathElementId]?.value
  const cropMetadataString = elementState[cropMetadataElementId]?.value
  const cropMetadata =
    cropMetadataString?.length > 0 ? JSON.parse(cropMetadataString) : {}

  const [imageURL, setImageURL] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const [crop, setCrop] = useState<Point>(cropMetadata?.crop! ?? { x: 0, y: 0 })
  const [zoom, setZoom] = useState(cropMetadata?.zoom! ?? 1)

  const [downloadImage] = useSampleDownloadFileMutation()
  const [uploadImage, { isLoading }] = useSampleUploadFileMutation()

  useEffect(() => {
    if (imagePath?.length > 0) {
      downloadImage({ sampleDownloadRequestDto: { path: imagePath } })
        .unwrap()
        .then((res) => {
          setImageURL(res as string)
        })
    }
  }, [imagePath])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFile(file)
      setImageURL(await readFileToURL(file))
    }
  }

  const generateCheckboxes = (elements: TestElementResponseDto[]) => {
    return elements.map((currentElementInfo) => {
      const currentElementState = elementState[currentElementInfo._id] ?? {}
      const highlightRule = getHighlightRule(currentElementInfo.highlightRules)

      return (
        <FormControlLabel
          key={currentElementInfo._id}
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
          key={currentElementInfo._id}
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
      <Paper sx={{ p: 1, mt: 1 }} variant="outlined">
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
      <Box sx={{ display: 'flex', mt: 1 }}>
        <Button
          variant="outlined"
          sx={{ mr: 2 }}
          disabled={currentTestState.isLocked}
          onClick={() => {
            setShouldShowImage(true)
          }}
        >
          Ảnh
        </Button>
        {generateTextFields(resultElement)}
      </Box>
      <SideAction
        open={shouldShowImage}
        onClose={() => {
          setShouldShowImage(false)
        }}
        title="Crop hình ảnh"
        disableClickOutside={false}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            component="label"
            endIcon={<FileUploadIcon />}
          >
            Upload
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />
          </Button>
          <Typography sx={{ ml: 1 }} fontStyle="italic">
            {file?.name}
          </Typography>
        </Box>
        {imageURL !== null && (
          <>
            <Box
              sx={{
                position: 'relative',
                height: '500px',
                width: '667px',
                my: 2,
              }}
            >
              <Cropper
                image={imageURL}
                crop={crop}
                zoom={zoom}
                showGrid={false}
                onCropChange={(point) => setCrop(point)}
                onZoomChange={(ratio) => setZoom(ratio)}
              />
            </Box>
            <Slider
              sx={{ mx: 1 }}
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </>
        )}

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ color: 'white', mt: 1 }}
          disabled={isLoading}
          onClick={async () => {
            if (file !== null) {
              const formData = new FormData()
              const extension = file.name.substring(
                file.name.lastIndexOf('.'),
                file.name.length
              )
              const filename = sampleId + extension
              formData.append('file', file, filename)

              await uploadImage({
                sampleUploadRequestDto: formData,
              }).unwrap()

              setElementState(imagePathElementId, {
                checked: false,
                value: filename,
              })
            }

            setElementState(cropMetadataElementId, {
              checked: false,
              value: JSON.stringify({ crop, zoom }),
            })
            
            setShouldShowImage(false)
          }}
        >
          Lưu
        </Button>
      </SideAction>
    </>
  )
}
