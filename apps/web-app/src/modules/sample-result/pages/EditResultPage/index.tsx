import {
  ID_TEST_PAPSMEAR,
  ID_TEST_THINPREP,
  ID_TEST_TD,
  PatientCategory,
  DATETIME_FORMAT,
} from '@diut/common'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItemButton,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { merge } from 'lodash'

import { useSampleUpdateByIdMutation } from 'src/api/sample'
import { TestResponseDto } from 'src/api/test'
import {
  HighlightRuleDto,
  TestElementResponseDto,
  useLazyTestElementSearchQuery,
} from 'src/api/test-element'
import { useLazyUserFindByIdQuery, UserResponseDto } from 'src/api/user'
import { FormContainer } from 'src/common/form-elements'
import { useTypedSelector } from 'src/core'
import {
  selectUserId,
  selectUserIsAdmin,
  selectUserName,
} from 'src/modules/auth'
import { getPatientCategory } from '../../utils'
import { editResultPageLoader } from './loader'
import { CommonResultCard } from './components/CommonResultCard'
import { TDResultCard } from './components/TDResultCard'
import { PapsmearResultCard } from './components/PapsmearResultCard'
import { ResultCardProps } from './components/utils'
import { format } from 'date-fns'

export default function EditResultPage() {
  const userId = useTypedSelector(selectUserId)
  const userName = useTypedSelector(selectUserName)
  const userIsAdmin = useTypedSelector(selectUserIsAdmin)

  const navigate = useNavigate()
  const sampleId = useParams().sampleId!
  const { author, sample, patient } = useLoaderData() as Awaited<
    ReturnType<typeof editResultPageLoader>
  >

  const patientCategory = useMemo(() => {
    return getPatientCategory(patient, sample)
  }, [sampleId])

  const getHighlightRule = useCallback(
    (highlightRules: HighlightRuleDto[]) => {
      return (
        highlightRules.find(({ category }) => category === patientCategory) ??
        highlightRules.find(
          ({ category }) => category === PatientCategory.Any
        ) ??
        ({} as HighlightRuleDto)
      )
    },
    [patientCategory]
  )

  const [tests, setTests] = useState<{
    [id: string]: TestResponseDto & {
      elements: TestElementResponseDto[]
    }
  }>({})

  const [testState, setTestState] = useState<{
    [testId: string]: {
      isLocked: boolean
      resultBy?: UserResponseDto
      resultAt?: Date
    }
  }>({})

  const [elementState, setElementState] = useState<{
    [elementId: string]: {
      checked: boolean
      value: string
    }
  }>({})

  const [users, setUsers] = useState<{
    [userId: string]: UserResponseDto
  }>({})

  const [searchTestElements] = useLazyTestElementSearchQuery()
  const [getUserById] = useLazyUserFindByIdQuery()

  useEffect(() => {
    sample.results.map(({ testId, resultBy }) => {
      if (resultBy?.length! > 0) {
        getUserById({ id: resultBy! }).then((res) => {
          const user = res.data!

          if (user) {
            setUsers((cache) =>
              Object.assign({}, cache, {
                [user._id]: user,
              })
            )
          }
        })
      }
      searchTestElements({
        searchTestElementRequestDto: {
          filter: {
            test: testId,
          },
          sort: {
            index: 1,
          },
        },
      }).then((res) => {
        const elements = res.data?.items!
        const test = elements[0].test

        setTests((cache) =>
          Object.assign({}, cache, {
            [test._id]: { ...test, elements },
          })
        )
      })
    })
  }, [sampleId])

  const sortedTests = useMemo(() => {
    return Object.values(tests)
      .sort((a, b) => {
        const categoryDelta = a.category.index - b.category.index
        if (categoryDelta !== 0) {
          return categoryDelta
        }
        return a.index - b.index
      })
      .map((res) => {
        const result = sample.results.find(
          (result) => result.testId === res._id
        )

        result?.elements?.forEach((element) => {
          setElementState((formState) =>
            Object.assign({}, formState, {
              [element.id]: {
                checked: element?.isHighlighted,
                value: element.value,
              },
            })
          )
        })

        const userId = result?.resultBy
        setTestState((testState) =>
          Object.assign({}, testState, {
            [result?.testId!]: {
              isLocked: result?.testCompleted ?? false,
              resultBy: userId && users[userId],
              resultAt: result?.resultAt,
            },
          })
        )

        return {
          ...res,
          result,
        }
      })
  }, [tests, users])

  const [updateSample, { isLoading: isSubmitting }] =
    useSampleUpdateByIdMutation()

  const handleSubmit = () => {
    const newResults = sample.results.map(
      ({ testId, bioProductName, testCompleted, elements }) => {
        const test = testState[testId] ?? {}

        return {
          testId,
          bioProductName,
          testCompleted: test.isLocked ?? testCompleted,
          elements: tests[testId].elements.map(
            ({ _id: elementId, highlightRules }) => {
              const { isHighlighted, value } =
                elements.find(({ id }) => id === elementId) ?? {}
              const element = elementState[elementId] ?? {}
              const highlightRule = getHighlightRule(highlightRules)

              return {
                id: elementId,
                isHighlighted:
                  element.checked ??
                  isHighlighted ??
                  highlightRule.defaultChecked ??
                  false,
                value: element.value ?? value ?? '',
              }
            }
          ),
        }
      }
    )

    updateSample({
      id: sample._id,
      updateSampleRequestDto: {
        results: newResults,
      },
    }).then(() => {
      toast.success('Lưu thành công')
    })
  }

  return (
    <FormContainer sx={{ p: 2 }}>
      <Box sx={{ position: 'fixed', width: '280px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            sx={{ mr: 1 }}
            fullWidth
            variant="outlined"
            onClick={() => {
              navigate(-1)
            }}
          >
            Quay về
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Lưu
          </Button>
        </Box>
        <Box
          sx={{
            my: 1,
            px: 2,
            py: 1,
            border: '1px #CCC solid',
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {sample.sampleId}
          </Typography>
          <Typography variant="h5">{patient.name}</Typography>
          <Typography fontStyle="italic" sx={{ mt: 2, opacity: '0.5' }}>
            {author.name}
          </Typography>
        </Box>
        <List
          sx={{
            bgcolor: 'background.paper',
            '&& .Mui-selected, && .Mui-selected:hover': {
              bgcolor: 'secondary.main',
              '&, & .MuiListItemIcon-root': {
                color: 'white',
              },
            },
          }}
        >
          {sortedTests.map((test) => {
            const currentTestState = testState[test._id] ?? {}
            return (
              <ListItemButton
                key={test._id}
                selected={!currentTestState.isLocked}
                onClick={() => {
                  document.getElementById(test._id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  })
                }}
              >
                {test.name}
              </ListItemButton>
            )
          })}
        </List>
      </Box>
      <Box
        sx={{
          ml: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {sample?.note?.length! > 0 && (
          <Alert
            variant="outlined"
            severity="info"
            color={'secondary' as any}
            sx={{ width: '100%', mb: 1 }}
          >
            {sample.note}
          </Alert>
        )}
        {sortedTests.map((currentTestInfo) => {
          const currentTestState = testState[currentTestInfo._id] ?? {}
          const resultCardProps: ResultCardProps = {
            getHighlightRule,
            currentTestInfo,
            currentTestState,
            elementState,
            setElementState: (elementId, { checked, value }) => {
              setElementState((formState: any) =>
                Object.assign({}, formState, {
                  [elementId]: merge(formState[elementId], { checked, value }),
                })
              )
            },
            sampleId: sampleId!,
          }

          return (
            <Card
              sx={{ mb: 4 }}
              key={currentTestInfo._id}
              raised
              id={currentTestInfo._id}
            >
              <CardHeader
                title={currentTestInfo.name}
                titleTypographyProps={{
                  color: currentTestState.isLocked ? '#CCC' : 'primary',
                  fontWeight:
                    currentTestInfo.shouldNotPrint === true ? 'normal' : 'bold',
                }}
                subheader={currentTestInfo.result?.bioProductName}
                action={
                  <Box sx={{ m: 1, display: 'flex', alignItems: 'center' }}>
                    {currentTestState.resultAt != null && (
                      <Typography
                        sx={{ opacity: 0.5, mr: 1 }}
                        variant="overline"
                      >
                        {format(
                          new Date(currentTestState.resultAt),
                          DATETIME_FORMAT
                        )}
                      </Typography>
                    )}
                    {currentTestState.resultBy != null && (
                      <Typography sx={{ fontStyle: 'italic', mr: 2 }}>
                        {currentTestState.resultBy.name}
                      </Typography>
                    )}
                    {currentTestState.isLocked ? (
                      (currentTestState.resultBy?._id === userId ||
                        userIsAdmin) && (
                        <Button
                          size="large"
                          variant="outlined"
                          onClick={() => {
                            setTestState((cache) =>
                              Object.assign({}, cache, {
                                [currentTestInfo._id]: {
                                  isLocked: false,
                                },
                              })
                            )
                          }}
                        >
                          <LockPersonIcon />
                        </Button>
                      )
                    ) : (
                      <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                        sx={{ color: 'white' }}
                        onClick={() => {
                          setTestState((cache) =>
                            Object.assign({}, cache, {
                              [currentTestInfo._id]: {
                                isLocked: true,
                                resultBy: { _id: userId, name: userName },
                                resultAt: new Date(),
                              },
                            })
                          )
                        }}
                      >
                        <LockOpenIcon />
                      </Button>
                    )}
                  </Box>
                }
              />
              <CardContent sx={{ px: 6, py: 0 }}>
                {currentTestInfo._id === ID_TEST_TD ? (
                  <TDResultCard {...resultCardProps} />
                ) : [ID_TEST_PAPSMEAR, ID_TEST_THINPREP].includes(
                    currentTestInfo._id
                  ) ? (
                  <PapsmearResultCard {...resultCardProps} />
                ) : (
                  <CommonResultCard {...resultCardProps} />
                )}
              </CardContent>
            </Card>
          )
        })}
      </Box>
    </FormContainer>
  )
}
