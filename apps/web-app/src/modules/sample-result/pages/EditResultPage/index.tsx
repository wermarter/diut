import { PatientCategory } from '@diut/common'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'

import { PatientResponseDto } from 'src/api/patient'
import { SampleResponseDto } from 'src/api/sample'
import { TestResponseDto } from 'src/api/test'
import {
  HighlightRuleDto,
  TestElementResponseDto,
  useLazyTestElementSearchQuery,
} from 'src/api/test-element'
import { useLazyUserFindByIdQuery, UserResponseDto } from 'src/api/user'
import { FormContainer } from 'src/common/form-elements'
import { getPatientCategory } from '../../utils'
import { checkHighlight, getTechnicalHint } from './utils'

export default function EditResultPage() {
  const navigate = useNavigate()
  const { sampleId } = useParams()
  const [sample, patient] = useLoaderData() as [
    SampleResponseDto,
    PatientResponseDto
  ]

  const patientCategory = useMemo(() => {
    return getPatientCategory(patient, sample)
  }, [sampleId])

  const [tests, setTests] = useState<{
    [id: string]: TestResponseDto & {
      elements: TestElementResponseDto[]
    }
  }>({})

  const [testState, setTestState] = useState<{
    [testId: string]: {
      author: UserResponseDto
      isLocked: boolean
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

          setUsers((cache) =>
            Object.assign({}, cache, {
              [user._id]: user,
            })
          )
        })
      }
      searchTestElements({
        searchTestElementRequestDto: {
          filter: {
            test: testId,
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
                checked: element.isHighlighted,
                value: element.value,
              },
            })
          )
        })

        const userId = result?.resultBy
        if (userId !== undefined) {
          setTestState((testState) =>
            Object.assign({}, testState, {
              [result?.testId!]: {
                authorName: users[userId],
                isLocked: true,
              },
            })
          )
        }

        return {
          ...res,
          result,
        }
      })
  }, [tests, users])

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Button
          sx={{ mr: 2 }}
          variant="outlined"
          onClick={() => {
            navigate('/result')
          }}
        >
          Quay về
        </Button>
        <Typography variant="h5">
          [{sample.sampleId}] {patient.name}
        </Typography>
      </Box>
      <FormContainer>
        {sortedTests.map((test) => {
          const currentTestState = testState[test._id] ?? {}

          return (
            <Card
              sx={{ my: 4, maxWidth: '700px', mx: 'auto' }}
              key={test._id}
              raised
            >
              <CardHeader
                title={test.name}
                titleTypographyProps={{
                  color: currentTestState.isLocked ? '#CCC' : 'primary',
                }}
                subheader={test.result?.bioProductName}
                action={
                  <Box sx={{ m: 1 }}>
                    {currentTestState.isLocked ? (
                      <Button
                        onClick={() => {
                          setTestState((cache) =>
                            Object.assign({}, cache, {
                              [test._id]: {
                                isLocked: false,
                              },
                            })
                          )
                        }}
                      >
                        Unlock
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ color: 'white' }}
                        onClick={() => {
                          setTestState((cache) =>
                            Object.assign({}, cache, {
                              [test._id]: {
                                isLocked: true,
                                author: { name: 'ouch' },
                              },
                            })
                          )
                        }}
                      >
                        Lock
                      </Button>
                    )}
                  </Box>
                }
              />
              <CardContent>
                <Table size="small">
                  <TableBody>
                    {test.elements.map((element) => {
                      const state = elementState[element._id] ?? {}
                      const highlightRule =
                        element.highlightRules.find(
                          ({ category }) => category === patientCategory
                        ) ??
                        element.highlightRules.find(
                          ({ category }) => category === PatientCategory.Any
                        ) ??
                        ({} as HighlightRuleDto)

                      return (
                        <TableRow key={element._id}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              disabled={currentTestState.isLocked}
                              disableRipple
                              color="secondary"
                              checked={state.checked ?? false}
                              onChange={(e) => {
                                setElementState((formState) =>
                                  Object.assign({}, formState, {
                                    [element._id]: {
                                      checked: e.target.checked,
                                      value: state.value,
                                    },
                                  })
                                )
                              }}
                            />
                          </TableCell>
                          <TableCell align="left" width="200px">
                            <Typography>{element.name}</Typography>
                          </TableCell>
                          <TableCell align="justify" width="200px">
                            <TextField
                              disabled={currentTestState.isLocked}
                              fullWidth
                              variant="standard"
                              value={state.value ?? ''}
                              onChange={(e) => {
                                const newValue = e.target.value
                                const checked =
                                  newValue.length > 0 &&
                                  checkHighlight(highlightRule, newValue)

                                setElementState((formState) =>
                                  Object.assign({}, formState, {
                                    [element._id]: {
                                      checked: checked,
                                      value: newValue,
                                    },
                                  })
                                )
                              }}
                            />
                          </TableCell>
                          <TableCell align="left" width="250px">
                            <Typography sx={{ opacity: 0.7 }}>
                              {getTechnicalHint(
                                patientCategory,
                                element.highlightRules
                              )}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )
        })}
      </FormContainer>
    </>
  )
}
