import { DATETIME_FORMAT } from '@diut/common'
import {
  AuthSubject,
  PrintFormAction,
  allTestSortComparator,
  checkPermission,
  createAbility,
} from '@diut/hcdc'
import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Unstable_Grid2'
import { format } from 'date-fns'
import { template } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FormAutocomplete,
  FormContainer,
  FormSelect,
  FormTextField,
} from 'src/components/form'
import { DialogTransition } from 'src/components/ui'
import { authSlice } from 'src/features/auth'
import { PrintFormResponseDto } from 'src/infra/api/access-service/print-form'
import {
  OmittedSampleResponseDto,
  OmittedTestResponseDto,
  SamplePrintSingleRequestDto,
  useLazySampleGetPrintPathQuery,
  useSamplePrintMutation,
} from 'src/infra/api/access-service/sample'
import { SampleTypeResponseDto } from 'src/infra/api/access-service/sample-type'
import { TestResponseDto } from 'src/infra/api/access-service/test'
import { useTypedSelector } from 'src/infra/redux'
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
  const userName = useTypedSelector(authSlice.selectors.selectUserName)
  const userAbility = useMemo(() => {
    return createAbility(userPermissions)
  }, [userPermissions])

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, dirtyFields },
    getValues,
    watch,
  } = useForm<FormSchema>({
    resolver: formResolver,
    defaultValues: formDefaultValues,
  })

  const [getPrintPath, { isFetching: isFetchingPrintPath }] =
    useLazySampleGetPrintPathQuery()
  const handleGetLink = async () => {
    console.log(
      (
        await getPrintPath({
          requests: [getPrintRequest(getValues())],
        }).unwrap()
      ).path,
    )
  }

  const [printSample] = useSamplePrintMutation()

  function getPrintRequest(data: FormSchema): SamplePrintSingleRequestDto {
    const overrideAuthor = dirtyFields.authorName || dirtyFields.authorTitle

    return {
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
    }
  }

  const handlePrint = async (data: FormSchema) => {
    await printSample({
      requests: [getPrintRequest(data)],
    }).unwrap()
  }

  const [allTestOptions, setAllTestOptions] = useState<
    OmittedTestResponseDto[]
  >([])
  const [testOptions, setTestOptions] = useState<OmittedTestResponseDto[]>([])
  const [sampleTypeOptions, setSampleTypeOptions] = useState<
    SampleTypeResponseDto[]
  >([])
  const [printFormOptions, setPrintFormOptions] = useState<
    PrintFormResponseDto[]
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
      setAllTestOptions(allTestOptions)

      const printFormIdSet = new Set<string>()
      allTestOptions.forEach(({ testId }) => {
        const test = props.testMap.get(testId)!

        for (const printFormId of test.printFormIds) {
          printFormIdSet.add(printFormId)
        }
      })

      const printFormOptions: PrintFormResponseDto[] = []
      printFormIdSet.forEach((printFormId) => {
        printFormOptions.push(props.printFormMap.get(printFormId)!)
      })

      setPrintFormOptions(printFormOptions)
      if (printFormOptions.length > 0) {
        setValue('printFormId', printFormOptions[0]._id)
      }
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

  const printFormId = watch('printFormId')
  useEffect(() => {
    if (printFormId.length > 1) {
      const printForm = props.printFormMap.get(printFormId)!

      const testOptions = allTestOptions.filter(({ testId }) => {
        const test = props.testMap.get(testId)!
        return test.printFormIds.includes(printFormId)
      })

      setTestOptions(testOptions)
      setValue(
        'testIds',
        testOptions.map(({ testId }) => testId) as FormSchema['testIds'],
      )

      if (printForm.authorName) {
        const compileAuthorName = template(printForm.authorName)
        setValue(
          'authorName',
          compileAuthorName({ user: { name: userName } }),
          {
            shouldDirty: false,
          },
        )
      }
      if (printForm.authorTitle) {
        setValue('authorTitle', printForm.authorTitle, {
          shouldDirty: false,
        })
      }
    }
  }, [printFormId])

  return (
    <Dialog
      TransitionComponent={DialogTransition}
      open={props.sample !== null}
      onClose={(e, reason) => {
        if (reason === 'backdropClick') {
          // many form-elements, easy to close
          return
        }
        props.onClose()
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            ID xét nghiệm: {props.sample?.sampleId}
          </Box>
          <LoadingButton
            variant="outlined"
            loading={isFetchingPrintPath}
            onClick={handleGetLink}
            color="secondary"
          >
            Link
          </LoadingButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <FormContainer onSubmit={handleSubmit(handlePrint)}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <FormSelect
                control={control}
                size="small"
                name="printFormId"
                label="Form In"
                options={printFormOptions}
                getOptionLabel={(printForm) => printForm.name}
                getOptionValue={(printForm) => printForm._id}
              />
            </Grid>
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
                  ) && props.printFormMap.get(printFormId)?.isAuthorLocked!
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
                  ) && props.printFormMap.get(printFormId)?.isAuthorLocked!
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
                  sx={{ mx: 1 }}
                  variant="outlined"
                  autoFocus
                  onClick={() => {
                    props.onClose()
                  }}
                >
                  Đóng
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
