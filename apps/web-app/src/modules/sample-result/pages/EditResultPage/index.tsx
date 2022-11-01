import {
  Button,
  Card,
  CardContent,
  CardHeader,
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
  TestElementResponseDto,
  useLazyTestElementSearchQuery,
} from 'src/api/test-element'
import { FormContainer } from 'src/common/form-elements'

export default function EditResultPage() {
  const navigate = useNavigate()
  const { sampleId } = useParams()
  const [sample, patient] = useLoaderData() as [
    SampleResponseDto,
    PatientResponseDto
  ]

  // const {
  //   control,
  //   handleSubmit,
  //   watch,
  //   setValue,
  //   getValues,
  //   formState: { isSubmitting },
  // } = useForm<FormSchema>({
  //   resolver: formResolver,
  //   defaultValues: {
  //     ...sampleInfo,
  //     infoAt: new Date(sampleInfo.infoAt),
  //     sampledAt: new Date(sampleInfo.sampledAt),
  //     tests: sampleInfo.results.map(({ testId, bioProductName }) => ({
  //       id: testId,
  //       bioProductName,
  //     })),
  //     ...patientInfo,
  //   },
  // })

  const [tests, setTests] = useState<{
    [id: string]: TestResponseDto & {
      elements: TestElementResponseDto[]
    }
  }>({})

  const [searchTestElements] = useLazyTestElementSearchQuery()

  useEffect(() => {
    sample.results.map(({ testId }) => {
      searchTestElements({
        searchTestElementRequestDto: {
          filter: {
            test: testId,
          },
        },
      }).then((res) => {
        const elements = res.data?.items!
        const test = elements[0].test

        setTests((cache) => ({
          ...cache,
          [test._id]: { ...test, elements },
        }))
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
      .map((res) => ({
        ...res,
        result: sample.results.find((result) => result.testId === res._id),
      }))
  }, [tests])

  return (
    <>
      <Button
        sx={{ mb: 2 }}
        variant="outlined"
        onClick={() => {
          navigate('/result')
        }}
      >
        Quay về
      </Button>
      <Typography variant="h5">
        Kết quả xét nghiệm ({sample.sampleId}) {patient.name}
      </Typography>
      <FormContainer>
        {sortedTests.map((test) => {
          return (
            <Card sx={{ my: 2 }} key={test._id} raised>
              <CardHeader
                title={test.name}
                titleTypographyProps={{
                  color: test.result?.testCompleted ? 'primary' : 'secondary',
                }}
                subheader={test.result?.bioProductName}
                action={
                  test.result?.testCompleted ? (
                    <Button>Sửa</Button>
                  ) : (
                    <Button variant="outlined">Lưu</Button>
                  )
                }
              />
              <CardContent>
                <Table size="small">
                  <TableBody>
                    {test.elements.map((element) => {
                      return (
                        <TableRow key={element._id}>
                          <TableCell align="left" width="250px">
                            <Typography>{element.name}</Typography>
                          </TableCell>
                          <TableCell align="justify" width="200px">
                            <TextField
                              fullWidth
                              variant="standard"
                              defaultValue={
                                test.result?.elements.find(
                                  ({ id }) => id === element._id
                                )?.value
                              }
                            />
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {element.highlightRules[0].description}
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
