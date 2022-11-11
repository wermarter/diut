import { PrintForm, printForms } from '@diut/common'
import { forwardRef, ReactElement, Ref, useEffect } from 'react'
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

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />
})

interface SinglePrintDialogProps {
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
  sample,
  onClose,
  sampleTypes,
}: SinglePrintDialogProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      sampleTypes: [],
      printForm: PrintForm.Basic,
      authorPosition: 'Phụ trách xét nghiệm',
      authorName: 'Lê Thị Mỹ Hạnh',
    },
  })

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
                options={printForms}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
              />
            </Grid>
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
            <Grid xs={12}>
              <FormTextField
                name="authorPosition"
                control={control}
                fullWidth
                label="Chức vị"
              />
            </Grid>
            <Grid xs={12}>
              <FormTextField
                name="authorName"
                control={control}
                fullWidth
                label="Họ tên"
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
