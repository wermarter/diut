import {
  AuthSubject,
  PrintFormAction,
  checkPermission,
  createAbility,
} from '@diut/hcdc'
import { DATETIME_FORMAT } from '@diut/common'
import { useMemo } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import Grid from '@mui/material/Unstable_Grid2'
import { LoadingButton } from '@mui/lab'
import { format } from 'date-fns'

import {
  OmittedSampleResponseDto,
  useSamplePrintMutation,
} from 'src/infra/api/access-service/sample'
import {
  FormAutocomplete,
  FormContainer,
  FormSelect,
  FormTextField,
} from 'src/components/form'
import { useTypedSelector } from 'src/infra/redux'
import { PrintFormResponseDto } from 'src/infra/api/access-service/print-form'
import { SampleTypeResponseDto } from 'src/infra/api/access-service/sample-type'
import { TestResponseDto } from 'src/infra/api/access-service/test'
import { authSlice } from 'src/features/auth'
import { DialogTransition } from 'src/components/ui'

interface FormData {
  testIds: string[]
  printFormId: string
  sampleTypeIds: string[]
  authorTitle: string
  authorName: string
}

type PrintSingleDialogProps = {
  sample: OmittedSampleResponseDto | null
  onClose: Function
  sampleTypeMap: Map<string, SampleTypeResponseDto>
  printFormMap: Map<string, PrintFormResponseDto>
  testMap: Map<string, TestResponseDto>
}

export function PrintSingleDialog(props: PrintSingleDialogProps) {
  const userPermissions = useTypedSelector(
    authSlice.selectors.selectUserPermissions,
  )
  const userAbility = useMemo(() => {
    return createAbility(userPermissions)
  }, [userPermissions])

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      sampleTypeIds: [],
      printFormId: '',
      authorTitle: '',
      authorName: '',
    },
  })

  const [printSample] = useSamplePrintMutation()

  const handlePrint = async (data: FormData) => {
    const response = (await printSample().unwrap()) as string
    const objectURL = (window.URL ?? window.webkitURL).createObjectURL(
      new Blob([response]),
    )
    const hiddenElement = document.createElement('a')
    hiddenElement.href = objectURL
    hiddenElement.target = '_blank'
    hiddenElement.click()
  }

  return (
    <Dialog
      TransitionComponent={DialogTransition}
      open={props.sample !== null}
      onClose={(e, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          // many form-elements, easy to close
          return
        }
        props.onClose()
      }}
    >
      <DialogTitle>ID xét nghiệm: {props.sample?.sampleId}</DialogTitle>
      <DialogContent dividers>
        <FormContainer onSubmit={handleSubmit(handlePrint)}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <FormAutocomplete
                size="medium"
                multiple
                groupBy={(option) => props.testMap.get(option.testId)?.name!}
                control={control}
                name="testIds"
                options={
                  props.sample?.results
                    .filter(({ isLocked }) => isLocked)
                    .toSorted((a, b) => {
                      const aTest = props.testMap.get(a.testId)
                      const bTest = props.testMap.get(b.testId)

                      if (
                        aTest?.testCategory?.displayIndex ===
                        bTest?.testCategory?.displayIndex
                      ) {
                        return (
                          (aTest?.displayIndex ?? 0) -
                          (bTest?.displayIndex ?? 0)
                        )
                      }
                      return (
                        (aTest?.testCategory?.displayIndex ?? 0) -
                        (bTest?.testCategory?.displayIndex ?? 0)
                      )
                    }) ?? []
                }
                getOptionLabel={(option) =>
                  props.testMap.get(option.testId)?.name!
                }
                getOptionValue={(option) => option.testId}
                label="Chọn XN"
              />
            </Grid>
            <Grid xs={12}>
              <FormSelect
                control={control}
                onChangeHook={(value) => {
                  const printForm = props.printFormMap.get(value)
                  if (printForm?.authorName) {
                    setValue('authorName', printForm.authorName)
                  }
                  if (printForm?.authorTitle) {
                    setValue('authorTitle', printForm.authorTitle)
                  }
                }}
                size="small"
                name="printFormId"
                label="Form In"
                options={Array.from(props.printFormMap.values()).filter(
                  ({ _id }) =>
                    watch('testIds')?.some(
                      (testId) =>
                        props.testMap.get(testId)?.printFormId === _id,
                    ) ?? true,
                )}
                getOptionLabel={(printForm) => printForm.name}
                getOptionValue={(printForm) => printForm._id}
              />
            </Grid>
            <Grid xs={12}>
              <FormAutocomplete
                multiple
                control={control}
                size="medium"
                name="sampleTypeIds"
                options={Array.from(props.sampleTypeMap.values()).filter(
                  ({ _id }) =>
                    watch('testIds')?.some(
                      (testId) =>
                        props.testMap.get(testId)?.sampleTypeId === _id,
                    ) ?? true,
                )}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option._id}
                label="Loại mẫu"
              />
            </Grid>
            <Grid xs={12}>
              <FormTextField
                name="authorTitle"
                control={control}
                fullWidth
                label="Chức vụ"
                disabled={
                  !checkPermission(
                    userAbility,
                    AuthSubject.PrintForm,
                    PrintFormAction.OverrideAuthor,
                  ) &&
                  props.printFormMap.get(watch('printFormId'))?.isAuthorLocked!
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
                  !checkPermission(
                    userAbility,
                    AuthSubject.PrintForm,
                    PrintFormAction.OverrideAuthor,
                  ) &&
                  props.printFormMap.get(watch('printFormId'))?.isAuthorLocked!
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
                {props.sample?.printedBy?.name && (
                  <>
                    <Typography variant="overline">
                      {format(
                        new Date(props.sample?.printedAt!),
                        DATETIME_FORMAT,
                      )}
                      {' • '}
                      {props.sample.printedBy.name}
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
                    props.onClose()
                  }}
                >
                  Bỏ qua
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  disabled={!watch('printFormId')}
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
