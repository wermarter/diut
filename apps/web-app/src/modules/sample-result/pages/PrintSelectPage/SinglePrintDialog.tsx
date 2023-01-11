import {
  PrintForm,
  ID_SAMPLE_TYPE_NUOC_TIEU,
  ID_SAMPLE_TYPE_HUYET_TRANG,
  ID_SAMPLE_TYPE_DICH_MU,
  ID_SAMPLE_TYPE_MAU,
  DATETIME_FORMAT,
} from '@diut/common'
import { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Slide, Typography } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { useForm } from 'react-hook-form'
import Grid from '@mui/material/Unstable_Grid2'
import { LoadingButton } from '@mui/lab'
import { format } from 'date-fns'

import { SampleResponseDto, useSamplePrintMutation } from 'src/api/sample'
import {
  FormAutocomplete,
  FormContainer,
  FormSelect,
  FormTextField,
} from 'src/common/form-elements'
import { useTypedSelector } from 'src/core'
import { selectUserIsAdmin, selectUserName } from 'src/modules/auth'
import { PrintFormResponseDto } from 'src/api/print-form'
import { SampleTypeResponseDto } from 'src/api/sample-type'
import { useUserFindByIdQuery } from 'src/api/user'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />
})

interface SinglePrintDialogProps {
  printFormData: PrintFormResponseDto[]
  sample: SampleResponseDto | null
  onClose: Function
  sampleTypes: SampleTypeResponseDto[] | undefined
}

interface FormData {
  printForm: PrintForm
  sampleTypes: string[] | undefined
  authorPosition?: string
  authorName?: string
}

export function SinglePrintDialog({
  printFormData,
  sample,
  onClose,
  sampleTypes,
}: SinglePrintDialogProps) {
  const userName = useTypedSelector(selectUserName)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      sampleTypes: [],
      printForm: printFormData[0]?._id as PrintForm,
      authorPosition: '',
      authorName: '',
    },
  })

  const selectedForm = watch('printForm')
  const [selectedPrintForm, setSelectedPrintForm] =
    useState<PrintFormResponseDto | null>(null)

  useEffect(() => {
    if (selectedForm?.length > 0) {
      const printForm = printFormData.find(({ _id }) => _id === selectedForm)!
      if (printForm._id === PrintForm.SoiNhuom) {
        setValue(
          'sampleTypes',
          sampleTypes
            ?.filter(({ _id }) =>
              [
                ID_SAMPLE_TYPE_NUOC_TIEU,
                ID_SAMPLE_TYPE_HUYET_TRANG,
                ID_SAMPLE_TYPE_DICH_MU,
              ].includes(_id)
            )
            .map(({ name }) => name)
        )
      } else if (printForm._id === PrintForm.Basic) {
        setValue(
          'sampleTypes',
          sampleTypes
            ?.filter(({ _id }) =>
              [ID_SAMPLE_TYPE_NUOC_TIEU, ID_SAMPLE_TYPE_MAU].includes(_id)
            )
            .map(({ name }) => name)
        )
      } else {
        setValue(
          'sampleTypes',
          sampleTypes?.map(({ name }) => name)
        )
      }

      setSelectedPrintForm(printForm)

      if (printForm._id === PrintForm.SoiNhuom) {
        setValue('authorPosition', printForm.authorPosition)
        setValue('authorName', userName)
      } else {
        setValue('authorPosition', printForm.authorPosition)
        setValue('authorName', printForm.authorName)
      }
    }
  }, [selectedForm])

  const userIsAdmin = useTypedSelector(selectUserIsAdmin)

  useEffect(() => {
    if (sampleTypes?.length! > 0) {
      if (printFormData[0]?._id === PrintForm.SoiNhuom) {
        setValue(
          'sampleTypes',
          sampleTypes
            ?.filter(({ _id }) =>
              [
                ID_SAMPLE_TYPE_NUOC_TIEU,
                ID_SAMPLE_TYPE_HUYET_TRANG,
                ID_SAMPLE_TYPE_DICH_MU,
              ].includes(_id)
            )
            .map(({ name }) => name)
        )
      } else if (printFormData[0]?._id === PrintForm.Basic) {
        setValue(
          'sampleTypes',
          sampleTypes
            ?.filter(({ _id }) =>
              [ID_SAMPLE_TYPE_NUOC_TIEU, ID_SAMPLE_TYPE_MAU].includes(_id)
            )
            .map(({ name }) => name)
        )
      } else {
        setValue(
          'sampleTypes',
          sampleTypes?.map(({ name }) => name)
        )
      }
    }
  }, [JSON.stringify(sampleTypes)])

  const { data: printer } = useUserFindByIdQuery(
    { id: sample?.printedBy! },
    { skip: sample?.printedBy == null }
  )

  const [printSample] = useSamplePrintMutation()

  const handlePrint = (data: FormData) => {
    return printSample({
      printSampleRequestDto: {
        samples: [
          {
            sampleId: sample?._id!,
            printForm: data.printForm,
            sampleTypes: data.sampleTypes,
            authorName: data.authorName,
            authorPosition: data.authorPosition,
          },
        ],
      },
    }).unwrap()
  }

  return (
    <Dialog
      TransitionComponent={Transition}
      open={sample !== null}
      onClose={(e, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return
        }
        onClose()
      }}
    >
      <DialogTitle>ID xét nghiệm: {sample?.sampleId}</DialogTitle>
      <DialogContent dividers>
        <FormContainer onSubmit={handleSubmit(handlePrint)}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <FormSelect
                control={control}
                size="medium"
                name="printForm"
                label="Form In"
                options={printFormData}
                getOptionLabel={(printForm) => printForm.name}
                getOptionValue={(printForm) => printForm._id}
              />
            </Grid>
            {(selectedForm === PrintForm.Basic ||
              selectedForm === PrintForm.SoiNhuom) && (
              <Grid xs={12}>
                <FormAutocomplete
                  control={control}
                  name="sampleTypes"
                  options={
                    sampleTypes?.map(({ name }) => ({
                      label: name,
                      value: name,
                    })) ?? []
                  }
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  label="Loại mẫu"
                />
              </Grid>
            )}
            <Grid xs={12}>
              <FormTextField
                name="authorPosition"
                control={control}
                fullWidth
                label="Chức vụ"
                disabled={
                  selectedPrintForm?._id! === PrintForm.SoiNhuom ||
                  !(userIsAdmin || !(selectedPrintForm?.isAuthorLocked ?? true))
                }
              />
            </Grid>
            <Grid xs={12}>
              <FormTextField
                name="authorName"
                control={control}
                fullWidth
                label="Họ tên"
                disabled={
                  selectedPrintForm?._id! === PrintForm.SoiNhuom ||
                  !(userIsAdmin || !(selectedPrintForm?.isAuthorLocked ?? true))
                }
              />
            </Grid>
            <Grid
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <Box sx={{ ml: 1 }}>
                {printer != null && (
                  <>
                    <Typography variant="overline">
                      {format(new Date(sample?.printedAt!), DATETIME_FORMAT)}
                      {' • '}
                      {printer?.name}
                    </Typography>
                  </>
                )}
              </Box>
              <Box>
                <Button
                  sx={{ mr: 1 }}
                  variant="outlined"
                  autoFocus
                  onClick={() => {
                    onClose()
                  }}
                >
                  Bỏ qua
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  In kết quả
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </FormContainer>
      </DialogContent>
    </Dialog>
  )
}
