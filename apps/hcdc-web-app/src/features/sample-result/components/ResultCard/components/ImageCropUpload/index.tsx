import FileUploadIcon from '@mui/icons-material/FileUpload'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Paper, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'
import { SideAction } from 'src/components/ui'
import {
  SampleUploadImageResponseDto,
  useSampleDownloadResultImageQuery,
  useSampleUploadResultImageMutation,
} from 'src/infra/api/access-service/sample'
import { readFileToURL } from 'src/shared/utils'
import { getCroppedImg } from 'src/shared/utils/image-crop'

export type ImageCropUploadProps = {
  imagePaths: [string | undefined, string | undefined] | null
  onClose: () => void
  onSubmit: (imagePaths: [string | undefined, string | undefined]) => void
  title?: string
  sampleId: string
  leftElementId: string
  rightElementId: string
  leftImageExisted: boolean
  rightImageExisted: boolean
}

export function ImageCropUpload(props: ImageCropUploadProps) {
  const [leftUploadFile, setLeftUploadFile] = useState<File | null>(null)
  const [rightUploadFile, setRightUploadFile] = useState<File | null>(null)

  const [leftDisplayImageURL, setLeftDisplayImageURL] = useState<string | null>(
    null,
  )
  const [rightDisplayImageURL, setRightDisplayImageURL] = useState<
    string | null
  >(null)

  const [uploadImage, { isLoading: isUploading }] =
    useSampleUploadResultImageMutation()

  const { data: leftDownloadImageURL, isFetching: isDownloadingLeftImage } =
    useSampleDownloadResultImageQuery(
      {
        sampleId: props.sampleId,
        testElementId: props.leftElementId,
      },
      {
        skip: !props.leftImageExisted,
        refetchOnMountOrArgChange: true,
      },
    )
  const { data: rightDownloadImageURL, isFetching: isDownloadingRightImage } =
    useSampleDownloadResultImageQuery(
      {
        sampleId: props.sampleId,
        testElementId: props.rightElementId,
      },
      {
        skip: !props.rightImageExisted,
        refetchOnMountOrArgChange: true,
      },
    )

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
    <SideAction
      open={!!props.imagePaths}
      onClose={props.onClose}
      title={props.title ?? ''}
      disableClickOutside={isUploading}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, m: 1 }}
      >
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
            <Typography fontStyle="italic">{rightUploadFile?.name}</Typography>
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
      <Box sx={{ mx: 1 }}>
        <LoadingButton
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          loading={isUploading}
          sx={{ color: 'white' }}
          onClick={async () => {
            let leftRes: SampleUploadImageResponseDto | null = null
            let rightRes: SampleUploadImageResponseDto | null = null

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
              )!
              const formData = prepareFormData(croppedFile!)
              rightRes = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}api/v1/samples/upload?sampleId=${props.sampleId}&testElementId=${props.rightElementId}`,
                {
                  method: 'POST',
                  body: formData,
                  credentials: 'include',
                },
              ).then((res) => res.json())
            } else {
              if (rightUploadFile != null) {
                // NO CROP, JUST UPLOAD
                rightRes = await uploadImage({
                  sampleUploadImageRequestDto: prepareFormData(rightUploadFile),
                  sampleId: props.sampleId,
                  testElementId: props.rightElementId,
                }).unwrap()
              }
            }

            if (leftUploadFile != null) {
              // NEW IMAGE
              leftRes = await uploadImage({
                sampleUploadImageRequestDto: prepareFormData(leftUploadFile),
                sampleId: props.sampleId,
                testElementId: props.leftElementId,
              }).unwrap()
            }

            props.onSubmit([leftRes?.storageKey, rightRes?.storageKey])
            props.onClose()
          }}
        >
          Lưu
        </LoadingButton>
      </Box>
    </SideAction>
  )
}
function prepareFormData(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return formData as any
}
