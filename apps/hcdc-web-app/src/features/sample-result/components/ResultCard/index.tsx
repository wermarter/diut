import LockPersonIcon from '@mui/icons-material/LockPerson'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import SaveIcon from '@mui/icons-material/Save'
import { format } from 'date-fns'
import { DATETIME_FORMAT, trimStringValues } from '@diut/common'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  AuthSubject,
  PatientCategory,
  PrintTemplate,
  SampleResultTest,
  TestResultAction,
  checkPermission,
  createAbility,
} from '@diut/hcdc'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material'

import {
  CardContentChung,
  CardContentPap,
  TestElementResultData,
} from './components'
import {
  SampleResultTestResponseDto,
  useSampleUpdateResultByIdMutation,
} from 'src/infra/api/access-service/sample'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { PrintFormResponseDto } from 'src/infra/api/access-service/print-form'
import { ProgressBar } from 'src/components/ui'

export type ResultCardProps = {
  sampleId: string
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
      AuthSubject.TestResult,
      TestResultAction.Modify,
      { ...props.testResult } as SampleResultTest,
    )
  }, [userPermissions])

  const [isLocked, setIsLocked] = useState(true)
  useEffect(() => {
    setIsLocked(props.testResult.isLocked)
  }, [props.testResult.isLocked])

  const CardContentComponent = useMemo(() => {
    const printForm = props.printFormMap.get(
      props.testResult.test?.printFormId!,
    )
    switch (printForm?.template!) {
      case PrintTemplate.FormPap:
        return CardContentPap
      // case PrintTemplate.FormTD:
      //   return ResultCardTD
      default:
        return CardContentChung
    }
  }, [props.testResult.test?.printFormId])

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

  return (
    <Card sx={{ mb: 4 }} raised={!isLoading} id={props.testResult.testId}>
      <CardHeader
        title={props.testResult.test?.name}
        titleTypographyProps={{
          color: props.testResult.isLocked ? '#CCC' : 'primary',
          fontWeight:
            props.testResult.test?.printFormId === null ? 'normal' : 'bold',
        }}
        subheader={props.testResult.bioProductName}
        action={
          <Box
            sx={{
              m: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <ButtonGroup>
              {isLocked ? (
                <Button
                  size="large"
                  variant="outlined"
                  disabled={!isAuthorized}
                  onClick={() => {
                    setIsLocked(false)
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
                  }}
                >
                  <LockOpenIcon />
                </Button>
              )}
              <Button
                size="large"
                variant="outlined"
                disabled={!isAuthorized}
                onClick={() => {
                  updateSampleResult({
                    id: props.sampleId,
                    sampleUpdateResultRequestDto: {
                      results: [
                        {
                          isLocked,
                          testId: props.testResult.testId,
                          elements: Object.keys(testElementResult).map(
                            (testElementId) => ({
                              testElementId,
                              ...trimStringValues(
                                testElementResult[testElementId],
                              ),
                            }),
                          ),
                        },
                      ],
                    },
                  })
                }}
              >
                <SaveIcon />
              </Button>
            </ButtonGroup>
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
      {isLoading && <ProgressBar />}
      <CardContent sx={{ px: 6, py: 0 }}>
        <CardContentComponent
          sampleId={props.sampleId}
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
