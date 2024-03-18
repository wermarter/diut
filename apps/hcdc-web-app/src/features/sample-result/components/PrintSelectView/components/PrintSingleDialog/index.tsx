import {
  AuthSubject,
  PrintFormAction,
  allTestSortComparator,
  checkPermission,
  createAbility,
} from '@diut/hcdc'
import { DATETIME_FORMAT } from '@diut/common'
import { useEffect, useMemo, useState } from 'react'
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
  OmittedTestResponseDto,
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
import { FormSchema, formDefaultValues, formResolver } from './validation'

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
    formState: { isSubmitting, dirtyFields },
    watch,
  } = useForm<FormSchema>({
    resolver: formResolver,
    defaultValues: formDefaultValues,
  })

  const [printSample] = useSamplePrintMutation()
  const handlePrint = async (data: FormSchema) => {
    const overrideAuthor = dirtyFields.authorName || dirtyFields.authorTitle

    await printSample({
      requests: [
        {
          sampleId: props.sample?._id!,
          printFormId: data.printFormId,
          sampleTypeIds: data.sampleTypeIds,
          testIds: data.testIds,
          ...(overrideAuthor && {
            overrideAuthor: {
              authorName: data.authorName,
              authorTitle: data.authorTitle,
            },
          }),
        },
      ],
    }).unwrap()
  }

  const [testOptions, setTestOptions] = useState<OmittedTestResponseDto[]>([])
  const [sampleTypeOptions, setSampleTypeOptions] = useState<
    SampleTypeResponseDto[]
  >([])
  useEffect(() => {
    if (props.sample?._id) {
      const allTestOptions =
        props.sample?.results
          .filter(({ isLocked }) => isLocked)
          .toSorted((a, b) => {
            const aTest = props.testMap.get(a.testId)!
            const bTest = props.testMap.get(b.testId)!

            return allTestSortComparator(aTest, bTest)
          }) ?? []
      setSampleTypeOptions(
        props.sample.sampleTypeIds.map(
          (sampleTypeId) => props.sampleTypeMap.get(sampleTypeId)!,
        ),
      )
      setTestOptions(allTestOptions)
      setValue(
        'testIds',
        allTestOptions.map(({ testId }) => testId) as FormSchema['testIds'],
      )
    }
  }, [props.sample?._id])

  const testIds = watch('testIds')
  useEffect(() => {
    const initSampleTypeOptions = Array.from(
      props.sampleTypeMap.values(),
    ).filter(
      ({ _id }) =>
        testIds?.some(
          (testId) => props.testMap.get(testId)?.sampleTypeId === _id,
        ) ?? true,
    )

    setValue(
      'sampleTypeIds',
      initSampleTypeOptions
        .map(({ _id }) => _id)
        .filter((id) => sampleTypeOptions.some(({ _id }) => _id === id)),
    )
  }, [testIds])

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
                options={testOptions}
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
                    setValue('authorName', printForm.authorName, {
                      shouldDirty: false,
                    })
                  }
                  if (printForm?.authorTitle) {
                    setValue('authorTitle', printForm.authorTitle, {
                      shouldDirty: false,
                    })
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
                options={sampleTypeOptions}
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
