import { DATETIME_FORMAT } from '@diut/common'
import {
  AuthSubject,
  ExternalRouteAction,
  ExternalRoutePath,
  PrintFormAction,
  Sample,
  SampleAction,
  allTestSortComparator,
  checkPermission,
  createAbility,
} from '@diut/hcdc'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import ShareIcon from '@mui/icons-material/Share'
import { LoadingButton } from '@mui/lab'
import { Box, ButtonGroup, Typography } from '@mui/material'
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
  useSampleLockMutation,
  useSamplePrintMutation,
  useSampleUnlockMutation,
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
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
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
    const { path } = await getPrintPath({
      requests: [getPrintRequest(getValues())],
    }).unwrap()

    const hiddenElement = document.createElement('a')
    hiddenElement.href = path
    hiddenElement.target = '_blank'
    hiddenElement.click()
  }

  const [printSample] = useSamplePrintMutation()
  const [lockSample] = useSampleLockMutation()
  const [unlockSample] = useSampleUnlockMutation()

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
  const [isLocked, setIsLocked] = useState(false)
  const [isAuthorizedLock, setIsAuthorizedLock] = useState(false)
  const [isAuthorizedGenerate, setIsAuthorizedGenerate] = useState(false)

  useEffect(() => {
    if (props.sample?._id) {
      setIsLocked(props.sample.isLocked)
      setIsAuthorizedLock(
        checkPermission(userAbility, AuthSubject.Sample, SampleAction.Lock, {
          ...props.sample,
        } as unknown as Sample),
      )
      setIsAuthorizedGenerate(
        checkPermission(
          userAbility,
          AuthSubject.ExternalRoute,
          ExternalRouteAction.Generate,
          { branchId, path: ExternalRoutePath.PrintSampleResult },
        ),
      )

      const allTestOptions =
        props.sample?.results
          .filter(({ isLocked }) => isLocked)
          .map((result) => {
            const test = props.testMap.get(result.testId)
            if (!test) {
              console.warn(`Test not found for testId: ${result.testId}`)
            }
            return { result, test }
          })
          .filter(
            (item): item is { result: OmittedTestResponseDto; test: TestResponseDto } =>
              item.test !== undefined,
          )
          .toSorted((a, b) => allTestSortComparator(a.test, b.test))
          .map((item) => item.result) ?? []
      setSampleTypeOptions(
        props.sample.sampleTypeIds
          .map((sampleTypeId) => {
            const sampleType = props.sampleTypeMap.get(sampleTypeId)
            if (!sampleType) {
              console.warn(`SampleType not found for sampleTypeId: ${sampleTypeId}`)
            }
            return sampleType
          })
          .filter((st): st is SampleTypeResponseDto => st !== undefined),
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
        const printForm = props.printFormMap.get(printFormId)
        if (printForm) {
          printFormOptions.push(printForm)
        } else {
          console.warn(`PrintForm not found for printFormId: ${printFormId}`)
        }
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
    if (printFormId && printFormId.length > 1) {
      const printForm = props.printFormMap.get(printFormId)
      if (!printForm) {
        console.warn(`PrintForm not found for printFormId: ${printFormId}`)
        return
      }

      const testOptions = allTestOptions.filter(({ testId }) => {
        const test = props.testMap.get(testId)
        return test?.printFormIds.includes(printFormId) ?? false
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
          <ButtonGroup>
            <LoadingButton
              variant="outlined"
              loading={isFetchingPrintPath}
              disabled={isLocked || !isAuthorizedGenerate}
              onClick={handleGetLink}
              color="secondary"
            >
              <ShareIcon />
            </LoadingButton>
            {isLocked ? (
              <Button
                size="large"
                variant="outlined"
                disabled={!isAuthorizedLock}
                onClick={() => {
                  setIsLocked(false)
                  unlockSample(props.sample?._id!)
                }}
                color="secondary"
              >
                <LockIcon />
              </Button>
            ) : (
              <Button
                size="large"
                variant="contained"
                disabled={!isAuthorizedLock}
                color="secondary"
                sx={{ color: 'white' }}
                onClick={() => {
                  setIsLocked(true)
                  lockSample(props.sample?._id!)
                }}
              >
                <LockOpenIcon />
              </Button>
            )}
          </ButtonGroup>
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
