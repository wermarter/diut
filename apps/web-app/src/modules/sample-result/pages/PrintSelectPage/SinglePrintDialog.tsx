import { PrintForm, printForms } from '@diut/common'
import { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { useForm } from 'react-hook-form'
import Grid from '@mui/material/Unstable_Grid2'
import { LoadingButton } from '@mui/lab'

import { SampleResponseDto, useSamplePrintMutation } from 'src/api/sample'
import {
  FormAutocomplete,
  FormContainer,
  FormSelect,
  FormTextField,
} from 'src/common/form-elements'
import { useTypedSelector } from 'src/core'
import { selectUserIsAdmin } from 'src/modules/auth'
import { PrintFormResponseDto } from 'src/api/print-form'

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
  sampleTypes: string[] | undefined
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
      setSelectedPrintForm(printForm)
      setValue('authorPosition', printForm.authorPosition)
      setValue('authorName', printForm.authorName)
    }
  }, [selectedForm])

  const userIsAdmin = useTypedSelector(selectUserIsAdmin)

  useEffect(() => {
    if (sampleTypes?.length! > 0) {
      setValue('sampleTypes', sampleTypes)
    }
  }, [JSON.stringify(sampleTypes)])

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
                options={printFormData.map(({ _id }) => ({
                  ...printForms.find(({ value }) => _id === value)!,
                }))}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
              />
            </Grid>
            {(selectedForm === PrintForm.Basic ||
              selectedForm === PrintForm.SoiNhuom) && (
              <Grid xs={12}>
                <FormAutocomplete
                  control={control}
                  name="sampleTypes"
                  options={
                    sampleTypes?.map((sampleTypeName) => ({
                      label: sampleTypeName,
                      value: sampleTypeName,
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
                label="Chức vị"
                disabled={
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
                  !(userIsAdmin || !(selectedPrintForm?.isAuthorLocked ?? true))
                }
              />
            </Grid>
            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
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
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                In kết quả
              </LoadingButton>
            </Grid>
          </Grid>
        </FormContainer>
      </DialogContent>
    </Dialog>
  )
}
