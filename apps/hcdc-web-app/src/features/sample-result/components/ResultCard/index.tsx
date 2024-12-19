import { DATETIME_FORMAT, trimObjectValues } from '@diut/common'
import {
  AuthSubject,
  PatientCategory,
  PrintTemplate,
  SampleResultTest,
  SampleTestResultAction,
  checkPermission,
  createAbility,
} from '@diut/hcdc'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ProgressBar } from 'src/components/ui'
import { authSlice } from 'src/features/auth'
import { PrintFormResponseDto } from 'src/infra/api/access-service/print-form'
import {
  SampleResponseDto,
  SampleResultTestResponseDto,
  useSampleUpdateResultByIdMutation,
} from 'src/infra/api/access-service/sample'
import { useTypedSelector } from 'src/infra/redux'
import {
  CardContentChung,
  CardContentPap,
  CardContentTD,
  TestElementResultData,
} from './components'

export type ResultCardProps = {
  sampleRes: SampleResponseDto
  testResult: SampleResultTestResponseDto
  patientCategory: PatientCategory
  printFormMap: Map<string, PrintFormResponseDto>
}

export function ResultCard(props: ResultCardProps) {
  const userPermissions = useTypedSelector(
    authSlice.selectors.selectUserPermissions,
  )
  const isAuthorized = useMemo(() => {
    const ability = createAbility(userPermissions)
    return checkPermission(
      ability,
      AuthSubject.SampleTestResult,
      SampleTestResultAction.Modify,
      props.testResult as unknown as Required<SampleResultTest>,
    )
  }, [userPermissions])

  const [isLocked, setIsLocked] = useState(true)
  useEffect(() => {
    setIsLocked(props.testResult.isLocked)
  }, [props.testResult.isLocked])

  const CardContentComponent = useMemo(() => {
    const printForm = props.printFormMap.get(
      props.testResult.test?.printFormIds[0]!,
    )
    switch (printForm?.template!) {
      case PrintTemplate.FormPap:
        return CardContentPap
      case PrintTemplate.FormTD:
        return CardContentTD
      default:
        return CardContentChung
    }
  }, [props.testResult.test?.printFormIds[0]])

  const [updateSampleResult, { isLoading }] =
    useSampleUpdateResultByIdMutation()

  const [testElementResult, setTestElementResult] = useState<
    Record<string, TestElementResultData>
  >({})

  const setElementResult = useCallback(
    (testElementId: string, data: Partial<TestElementResultData>) => {
      setTestElementResult((prev) =>
        Object.assign({}, prev, {
          [testElementId]: { ...prev[testElementId], ...data },
        }),
      )
    },
    [],
  )

  useEffect(() => {
    props.testResult.elements.forEach(
      ({ testElementId, isAbnormal, value }) => {
        setElementResult(testElementId, { isAbnormal, value })
      },
    )
  }, [props.testResult.testId, setElementResult])

  const handleUpdateResult = (isLocked: boolean) =>
    updateSampleResult({
      id: props.sampleRes._id,
      sampleUpdateResultRequestDto: {
        results: [
          {
            isLocked,
            testId: props.testResult.testId,
            elements: Object.keys(testElementResult).map((testElementId) => ({
              testElementId,
              ...trimObjectValues(testElementResult[testElementId]),
            })),
          },
        ],
      },
    })

  return (
    <Card sx={{ mb: 4 }} raised={!isLoading} id={props.testResult.testId}>
      {isLoading && <ProgressBar />}
      <CardHeader
        title={props.testResult.test?.name}
        titleTypographyProps={{
          mt: 1,
          ml: 1,
          color: props.testResult.isLocked ? '#CCC' : 'primary',
          fontWeight:
            props.testResult.test?.printFormIds.length === 0
              ? 'normal'
              : 'bold',
        }}
        sx={{
          alignItems: 'flex-start',
          pb: 0,
          mb: 2,
          borderBottom: '1px solid #CCC',
        }}
        subheader={props.testResult.bioProductName}
        subheaderTypographyProps={{
          ml: 1,
          color: props.testResult.isLocked ? '#CCC' : 'primary',
        }}
        action={
          <Box
            sx={{
              m: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            {isLocked ? (
              <Button
                size="large"
                variant="outlined"
                disabled={!isAuthorized}
                onClick={() => {
                  setIsLocked(false)
                  handleUpdateResult(false)
                }}
              >
                <LockPersonIcon />
              </Button>
            ) : (
              <Button
                size="large"
                variant="contained"
                disabled={!isAuthorized}
                color="secondary"
                sx={{ color: 'white' }}
                onClick={() => {
                  setIsLocked(true)
                  handleUpdateResult(true)
                }}
              >
                <LockOpenIcon />
              </Button>
            )}
            {props.testResult.resultBy != null && (
              <Typography sx={{ opacity: 0.5 }} variant="overline">
                {props.testResult.resultBy.name}
                {' - '}
                {format(new Date(props.testResult.resultAt!), DATETIME_FORMAT)}
              </Typography>
            )}
          </Box>
        }
      />
      <CardContent sx={{ px: 6, py: 0 }}>
        <CardContentComponent
          sampleId={props.sampleRes._id}
          isDisabled={isLocked || !isAuthorized || isLoading}
          resultState={testElementResult}
          resultRes={props.testResult}
          setResultState={setElementResult}
          patientCategory={props.patientCategory}
        />
      </CardContent>
    </Card>
  )
}
