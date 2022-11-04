import { Box, Button, Unstable_Grid2 as Grid } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

import { TestResponseDto } from 'src/api/test'
import {
  TestElementResponseDto,
  useLazyTestElementSearchQuery,
} from 'src/api/test-element'
import { printResultPageLoader } from './loader'

export default function PrintResultPage() {
  const { sampleId } = useParams()
  const {
    sampleInfo,
    patientInfo,
    patientTypes,
    indications,
    doctors,
    sampleTypes,
  } = useLoaderData() as Awaited<ReturnType<typeof printResultPageLoader>>

  const [tests, setTests] = useState<{
    [id: string]: TestResponseDto
  }>({})

  const [testElements, setTestElements] = useState<{
    [id: string]: TestElementResponseDto
  }>({})

  const [searchTestElements] = useLazyTestElementSearchQuery()

  useEffect(() => {
    sampleInfo.results.map(({ testId }) => {
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
            [test._id]: test,
          })
        )

        elements.forEach((element) => {
          setTestElements((cache) =>
            Object.assign({}, cache, {
              [element._id]: element,
            })
          )
        })
      })
    })
  }, [sampleId])

  const componentRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <Box>
      <Button variant="contained" onClick={handlePrint}>
        Print
      </Button>
      <Grid container ref={componentRef}>
        <Grid xs={12}></Grid>
        <Grid>{JSON.stringify(sampleInfo.results)}</Grid>
      </Grid>
    </Box>
  )
}
