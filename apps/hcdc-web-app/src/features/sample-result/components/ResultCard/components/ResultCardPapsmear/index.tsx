import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import Cropper, { Area, Point } from 'react-easy-crop'
import { LoadingButton } from '@mui/lab'

import {
  useSampleDownloadFileQuery,
  useSampleUploadFileMutation,
} from 'src/infra/api/access-service/sample'
import { TestElementResponseDto } from 'src/infra/api/access-service/test-element'
import { SideAction } from 'src/components/ui/SideAction'
import { readFileToURL } from 'src/shared/utils'
import { getCroppedImg } from 'src/shared/utils/image-crop'
import { ResultCardProps } from '../../../../pages/ResultEditPage/components/utils'

export const PapsmearResultCard = ({
  currentTestState,
  currentTestInfo,
  elementState,
  setElementState,
  getHighlightRule,
  sampleId,
}: ResultCardProps) => {
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
  const resultElement = elements.at(31)!
  const resultElementState = elementState[resultElement._id] ?? {
    checked: false,
    value: '',
  }

  const generateCheckboxes = (
    elements: TestElementResponseDto[],
    disableFirst = false,
  ) => {
    return elements.map((currentElementInfo, index) => {
      const currentElementState = elementState[currentElementInfo._id] ?? {}
      const highlightRule = getHighlightRule(currentElementInfo.highlightRules)

      return (
        <FormControlLabel
          key={currentElementInfo._id}
          disabled={
            currentTestState.isLocked || (index === 0 && disableFirst === true)
          }
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
          variant="outlined"
          value={currentElementState.value ?? ''}
          onChange={(e) => {
            setElementState(currentElementInfo._id, {
              value: e.target.value,
            })
          }}
        />
      )
    })
  }

  // --------------------------------------------------------------------------

  const leftImagePathElementId = elements.at(32)?._id!
  const rightImagePathElementId = elements.at(33)?._id!
  const leftImagePath = elementState[leftImagePathElementId]?.value
  const rightImagePath = elementState[rightImagePathElementId]?.value

  const [leftUploadFile, setLeftUploadFile] = useState<File | null>(null)
  const [rightUploadFile, setRightUploadFile] = useState<File | null>(null)

  const [leftDisplayImageURL, setLeftDisplayImageURL] = useState<string | null>(
    null,
  )
  const [rightDisplayImageURL, setRightDisplayImageURL] = useState<
    string | null
  >(null)

  const { data: leftDownloadImageURL, isFetching: isDownloadingLeftImage } =
    useSampleDownloadFileQuery(
      {
        sampleDownloadRequestDto: { path: leftImagePath },
      },
      { skip: !(leftImagePath?.length > 0), refetchOnMountOrArgChange: true },
    )
  const { data: rightDownloadImageURL, isFetching: isDownloadingRightImage } =
    useSampleDownloadFileQuery(
      {
        sampleDownloadRequestDto: { path: rightImagePath },
      },
      { skip: !(rightImagePath?.length > 0), refetchOnMountOrArgChange: true },
    )
  const [uploadImage, { isLoading: isUploading }] =
    useSampleUploadFileMutation()

  useEffect(() => {
    if (!isDownloadingLeftImage) {
      setLeftDisplayImageURL(leftDownloadImageURL as string)
    }
  }, [isDownloadingLeftImage])

  useEffect(() => {
    if (!isDownloadingRightImage) {
      setRightDisplayImageURL(rightDownloadImageURL as string)
    }
  }, [isDownloadingRightImage])

  const handleLeftFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setLeftUploadFile(file)
      setLeftDisplayImageURL(await readFileToURL(file))
    }
  }

  const handleRightFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setRightUploadFile(file)
      setRightDisplayImageURL(await readFileToURL(file))
    }
  }

  const [shouldCrop, setShouldCrop] = useState(false)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | Area>(null)

  const onCropComplete = useCallback(
    (croppedArea: unknown, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    [],
  )

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
          disabled={currentTestState.isLocked}
          color="secondary"
          checked={resultElementState.checked ?? false}
          onChange={(e) => {
            setElementState(resultElement._id, {
              checked: e.target.checked,
            })
          }}
        />
        <TextField
          error={resultElementState.checked}
          key={resultElement._id}
          label={resultElement.name}
          name={resultElement._id}
          disabled={currentTestState.isLocked}
          fullWidth
          variant="outlined"
          value={resultElementState.value ?? ''}
          onChange={(e) => {
            setElementState(resultElement._id, {
              checked: false,
              value: e.target.value,
            })
          }}
        />
        <Button
          variant="outlined"
          sx={{ ml: 1 }}
          disabled={currentTestState.isLocked}
          onClick={() => {
            setShouldShowImage(true)
          }}
        >
          Ảnh
        </Button>
      </Box>
      <SideAction
        open={shouldShowImage}
        onClose={() => {
          setShouldShowImage(false)
        }}
        title={currentTestInfo.name}
        disableClickOutside={false}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
          <Paper variant="outlined" sx={{ flexGrow: 1, p: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
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
                  onChange={handleLeftFileChange}
                />
              </Button>
              <Typography fontStyle="italic">{leftUploadFile?.name}</Typography>
            </Box>
            {leftDisplayImageURL != null ? (
              <img
                src={leftDisplayImageURL}
                width="500px"
                height="375px"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <Box sx={{ height: '375px' }} />
            )}
          </Paper>
          <Paper variant="outlined" sx={{ flexGrow: 1, p: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
              <Button
                variant="contained"
                onClick={() => setShouldCrop((shouldCrop) => !shouldCrop)}
              >
                Crop
              </Button>
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
                  onChange={handleRightFileChange}
                />
              </Button>
              <Typography fontStyle="italic">
                {rightUploadFile?.name}
              </Typography>
            </Box>
            {shouldCrop && leftDisplayImageURL != null ? (
              <Box
                sx={{
                  position: 'relative',
                  height: '375px',
                  width: '500px',
                }}
              >
                <Cropper
                  image={leftDisplayImageURL}
                  crop={crop}
                  zoom={zoom}
                  showGrid={false}
                  onCropChange={(point) => setCrop(point)}
                  onZoomChange={(ratio) => setZoom(ratio)}
                  onCropComplete={onCropComplete}
                />
              </Box>
            ) : rightDisplayImageURL != null ? (
              <img
                src={rightDisplayImageURL!}
                width="500px"
                height="375px"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <Box sx={{ height: '375px' }} />
            )}
          </Paper>
        </Box>
        <LoadingButton
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          loading={isUploading}
          sx={{ color: 'white', mt: 1 }}
          onClick={async () => {
            const promises: Promise<unknown>[] = []
            const testId = currentTestInfo._id

            if (leftUploadFile != null) {
              // NEW IMAGE
              const { formData, filename } = prepareFormData(
                leftUploadFile,
                sampleId,
                testId,
                'left',
              )
              promises.push(
                uploadImage({ sampleUploadRequestDto: formData }).unwrap(),
              )
              setElementState(leftImagePathElementId, {
                checked: false,
                value: filename,
              })
            }

            if (
              shouldCrop &&
              leftDisplayImageURL != null &&
              croppedAreaPixels != null
            ) {
              // NEW CROP
              const croppedFile = await getCroppedImg(
                leftDisplayImageURL,
                croppedAreaPixels,
                0,
              )
              const { formData, filename } = prepareFormData(
                croppedFile!,
                sampleId,
                testId,
                'right',
              )
              promises.push(
                uploadImage({ sampleUploadRequestDto: formData }).unwrap(),
              )
              setElementState(rightImagePathElementId, {
                checked: false,
                value: filename,
              })
            } else {
              if (rightUploadFile != null) {
                // NO CROP, JUST UPLOAD
                const { formData, filename } = prepareFormData(
                  rightUploadFile,
                  sampleId,
                  currentTestInfo._id,
                  'right',
                )
                promises.push(
                  uploadImage({ sampleUploadRequestDto: formData }).unwrap(),
                )
                setElementState(rightImagePathElementId, {
                  checked: false,
                  value: filename,
                })
              }
            }

            await Promise.all(promises)
            setShouldShowImage(false)
          }}
        >
          Lưu
        </LoadingButton>
      </SideAction>
    </>
  )
}

function prepareFormData(
  file: File,
  sampleId: string,
  testId: string,
  position: 'left' | 'right',
) {
  // const extension = file.name.substring(
  //   file.name.lastIndexOf('.'),
  //   file.name.length
  // )
  const filename = sampleId + '_' + testId + '_' + position + '.jpg'
  const formData = new FormData()
  formData.append('file', file, filename)
  return { formData, filename }
}
