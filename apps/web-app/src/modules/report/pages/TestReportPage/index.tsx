import { useLoaderData, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format, startOfDay, endOfDay } from 'date-fns'
import { Gender } from '@diut/common'
import { Box, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import {
  SampleResponseDto,
  SearchSampleResponseDto,
  useSampleSearchQuery,
} from 'src/api/sample'
import { DataTable } from 'src/common/components/DataTable'
import {
  PatientResponseDto,
  useLazyPatientFindByIdQuery,
} from 'src/api/patient'
import { useCrudPagination } from 'src/common/hooks'
import { testReportPageLoader } from './loader'
import { useForm } from 'react-hook-form'
import { FormContainer, FormDateTimePicker } from 'src/common/form-elements'
import { GridColDef } from '@mui/x-data-grid'

interface FilterData {
  fromDate: Date
  toDate: Date
}

export default function TestReportPage() {
  const { patientTypeMap, categories, groups, tests } =
    useLoaderData() as Awaited<ReturnType<typeof testReportPageLoader>>
  const [searchParams, setSearchParams] = useSearchParams()

  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    useCrudPagination({
      offset: 0,
      limit: 100,
      sort: { infoAt: -1 },
      filter: {
        infoCompleted: true,
      },
    })

  const { control, handleSubmit, watch, setValue } = useForm<FilterData>({
    defaultValues: {
      fromDate:
        searchParams.get('fromDate') !== null
          ? new Date(searchParams.get('fromDate')!)
          : new Date(),
      toDate:
        searchParams.get('toDate') !== null
          ? new Date(searchParams.get('toDate')!)
          : new Date(),
    },
  })
  const fromDate = watch('fromDate')
  const toDate = watch('toDate')

  const handleSubmitFilter = ({ fromDate, toDate }: FilterData) => {
    setSearchParams({
      fromDate: fromDate.toISOString(),
      toDate: toDate.toISOString(),
    })

    return setFilterObj((obj) => ({
      ...obj,
      filter: {
        ...obj.filter,
        infoAt: {
          $gte: startOfDay(fromDate).toISOString(),
          $lte: endOfDay(toDate).toISOString(),
        },
      },
    }))
  }

  useEffect(() => {
    if (toDate < fromDate) {
      setValue('fromDate', toDate)
    } else {
      handleSubmit(handleSubmitFilter)()
    }
  }, [fromDate, toDate])

  const { data, isFetching: isFetchingSamples } = useSampleSearchQuery({
    searchSampleRequestDto: filterObj,
  })

  const [getPatient, { isFetching: isFetchingPatients }] =
    useLazyPatientFindByIdQuery()

  const [samples, setSamples] = useState<SearchSampleResponseDto>()
  const [patients, setPatients] = useState<{
    [id: string]: PatientResponseDto
  }>({})

  const [summary, setSummary] = useState<Record<string, number>>({})

  async function expandId(samples: SampleResponseDto[]) {
    const promises = samples.map(async ({ patientId }) => {
      getPatient({ id: patientId }, true).then((res) => {
        setPatients((cache) =>
          Object.assign({}, cache, {
            ...cache,
            [patientId]: res.data!,
          })
        )
      })
    })

    const tempSummary: Record<string, number> = {}
    samples.forEach(({ results }) => {
      results.forEach(({ testId }) => {
        if (tempSummary[testId] === undefined) {
          tempSummary[testId] = 0
        }
        tempSummary[testId]++
      })
    })
    setSummary(tempSummary)

    return Promise.all(promises)
  }

  useEffect(() => {
    if (!isFetchingSamples) {
      expandId(data?.items!)
      setSamples(data!)
    }
  }, [isFetchingSamples, JSON.stringify(filterObj)])

  return (
    <Box
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper sx={{ p: 2, mb: 2 }} elevation={4}>
        <FormContainer onSubmit={handleSubmit(handleSubmitFilter)}>
          <Grid container spacing={2}>
            <Grid xs={2}>
              <FormDateTimePicker
                control={control}
                name="fromDate"
                dateOnly
                label="Từ ngày"
              />
            </Grid>
            <Grid xs={2}>
              <FormDateTimePicker
                control={control}
                name="toDate"
                dateOnly
                label="Đến ngày"
              />
            </Grid>
            <Grid xs={8}>
              <input type="submit" style={{ display: 'none' }} />
            </Grid>
          </Grid>
        </FormContainer>
      </Paper>
      <Box sx={{ flexGrow: 1 }}>
        <DataTable
          cellOutline
          rows={
            samples?.items.concat({
              _id: 'test-report-summary',
              isSummary: true,
            } as any) || []
          }
          autoRowHeight
          loading={isFetchingSamples || isFetchingPatients}
          getRowId={(row) => row._id}
          experimentalFeatures={{ columnGrouping: true }}
          columnGroupingModel={[
            {
              groupId: 'THÔNG TIN KHÁCH HÀNG',
              children: [
                { field: 'sampleId' },
                { field: 'name' },
                { field: 'birthYear' },
                { field: 'gender' },
                { field: 'address' },
                { field: 'phoneNumber' },
                { field: 'patientType' },
              ],
            },
            ...categories.map((categoryName) => ({
              groupId: categoryName,
              children: groups[categoryName].map(({ _id }) => ({
                field: _id,
              })),
            })),
          ]}
          columns={[
            {
              field: 'infoAt',
              headerName: 'Nhận bệnh',
              width: 100,
              sortable: false,
              valueGetter: ({ value }) => {
                if (value === undefined) {
                  return ''
                }
                return format(new Date(value), 'dd/MM/yyyy HH:mm')
              },
            },
            {
              field: 'sampleId',
              headerName: 'ID XN',
              width: 120,
              sortable: false,
              renderCell: ({ value }) => <strong>{value}</strong>,
            },
            {
              field: 'name',
              headerName: 'Tên',
              sortable: false,
              width: 100,
              valueGetter: ({ row }) => patients[row.patientId]?.name,
            },
            {
              field: 'birthYear',
              headerName: 'Năm',
              width: 60,
              sortable: false,
              valueGetter: ({ row }) => patients[row.patientId]?.birthYear,
            },
            {
              field: 'gender',
              headerName: 'Giới',
              width: 60,
              sortable: false,
              valueGetter: ({ row }) => {
                if (patients[row.patientId]?.gender === undefined) {
                  return ''
                }

                if (patients[row.patientId]?.gender === Gender.Female) {
                  return 'Nữ'
                } else {
                  return 'Nam'
                }
              },
            },
            {
              field: 'address',
              headerName: 'Địa chỉ',
              width: 80,
              sortable: false,
              valueGetter: ({ row }) => patients[row.patientId]?.address,
            },
            {
              field: 'phoneNumber',
              headerName: 'SĐT',
              width: 120,
              sortable: false,
              valueGetter: ({ row }) => patients[row.patientId]?.phoneNumber,
            },
            {
              field: 'patientType',
              headerName: 'Đối tượng',
              width: 90,
              sortable: false,
              valueGetter: ({ row }) =>
                patientTypeMap.get(row.patientTypeId)?.name,
            },
            ...tests.map(
              ({ _id, name }): GridColDef<SampleResponseDto> => ({
                field: _id,
                headerName: name,
                width: 80,
                sortable: false,
                align: 'center',
                renderCell: ({ value }) => (
                  <Typography fontWeight="bold">{value}</Typography>
                ),
                valueGetter: ({ row }) => {
                  //@ts-ignore
                  if (row?.isSummary === true) {
                    return summary[_id]
                  }
                  if (row.results.some(({ testId }) => testId === _id)) {
                    return '✓'
                  }
                  return ''
                },
              })
            ),
          ]}
          paginationMode="server"
          rowsPerPageOptions={[5, 10, 20, 100]}
          rowCount={samples?.total ?? 0}
          page={samples?.offset ?? 0}
          pageSize={samples?.limit ?? 10}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </Box>
    </Box>
  )
}
