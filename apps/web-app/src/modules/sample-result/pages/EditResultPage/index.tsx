import { PatientCategory } from '@diut/common'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  List,
  ListItemButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import LockOpenIcon from '@mui/icons-material/LockOpen'

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
import { checkHighlight } from './utils'
import { editResultPageLoader } from './loader'

export default function EditResultPage() {
  const userId = useTypedSelector(selectUserId)
  const userName = useTypedSelector(selectUserName)
  const userIsAdmin = useTypedSelector(selectUserIsAdmin)

  const navigate = useNavigate()
  const { sampleId } = useParams()
  const { sample, patient } = useLoaderData() as Awaited<
    ReturnType<typeof editResultPageLoader>
  >

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
                checked: element.isHighlighted,
                value: element.value,
              },
            })
          )
        })

        const userId = result?.resultBy
        setTestState((testState) =>
          Object.assign({}, testState, {
            [result?.testId!]: {
              author: userId && users[userId],
              isLocked: result?.testCompleted ?? false,
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
      ({ testId, bioProductName, testCompleted, resultBy, elements }) => {
        const test = testState[testId] ?? {}

        return {
          testId,
          bioProductName,
          testCompleted: test.isLocked ?? testCompleted,
          resultBy: test.author?._id ?? resultBy,
          elements: tests[testId].elements.map(({ _id: elementId }) => {
            const { isHighlighted, value } =
              elements.find(({ id }) => id === elementId) ?? {}
            const element = elementState[elementId] ?? {}

            return {
              id: elementId,
              isHighlighted: element.checked ?? isHighlighted ?? false,
              value: element.value ?? value ?? '',
            }
          }),
        }
      }
    )
    const sampleCompleted = !newResults.some(
      ({ testCompleted }) => testCompleted === false
    )

    updateSample({
      id: sample._id,
      updateSampleRequestDto: {
        results: newResults,
        sampleCompleted,
      },
    }).then(() => {
      toast.success('Lưu thành công')
    })
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ position: 'fixed', width: '200px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            sx={{ mr: 1 }}
            fullWidth
            variant="outlined"
            onClick={() => {
              navigate('/result')
            }}
          >
            Quay về
          </Button>
          <Button
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
          <Typography variant="h6">{sample.sampleId}</Typography>
          <Typography variant="h5">{patient.name}</Typography>
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
              >
                {test.name}
              </ListItemButton>
            )
          })}
        </List>
      </Box>
      <FormContainer sx={{ ml: '250px' }}>
        {sortedTests.map((test) => {
          const currentTestState = testState[test._id] ?? {}
          return (
            <Card sx={{ mb: 4, maxWidth: '700px' }} key={test._id} raised>
              <CardHeader
                title={test.name}
                titleTypographyProps={{
                  color: currentTestState.isLocked ? '#CCC' : 'primary',
                }}
                subheader={test.result?.bioProductName}
                action={
                  <Box sx={{ m: 1, display: 'flex', alignItems: 'center' }}>
                    {currentTestState.author != undefined && (
                      <Typography sx={{ fontStyle: 'italic', mr: 2 }}>
                        {currentTestState.author.name}
                      </Typography>
                    )}
                    {currentTestState.isLocked ? (
                      (currentTestState.author?._id === userId ||
                        userIsAdmin) && (
                        <Button
                          size="large"
                          variant="outlined"
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
                              [test._id]: {
                                isLocked: true,
                                author: { _id: userId, name: userName },
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
              <CardContent sx={{ px: 10 }}>
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
                            <Typography
                              sx={{
                                color: currentTestState.isLocked
                                  ? '#CCC'
                                  : 'inherit',
                                fontWeight: state.checked ? 'bold' : 'normal',
                              }}
                            >
                              {element.name}
                            </Typography>
                          </TableCell>
                          <TableCell width="200px">
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
    </Box>
  )
}
