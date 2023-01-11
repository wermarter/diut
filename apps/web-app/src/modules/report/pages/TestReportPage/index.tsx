import { useLoaderData, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format, startOfDay, endOfDay } from 'date-fns'
import { DATETIME_FORMAT, Gender } from '@diut/common'
import { Box, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { GridColDef } from '@mui/x-data-grid'
import { useForm } from 'react-hook-form'

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
import {
  FormContainer,
  FormDateTimePicker,
  FormSelect,
} from 'src/common/form-elements'

const ANY_PATIENT_TYPE = 'ANY_PATIENT_TYPE'

enum IsNgoaiGio {
  Any = 'ANY_NGOAI_GIO',
  NgoaiGio = 'IS_NGOAI_GIO',
  TrongGio = 'IS_TRONG_GIO',
}

interface FilterData {
  fromDate: Date
  toDate: Date
  patientType: string
  isNgoaiGio: IsNgoaiGio
}

function parseIsNgoaiGio(isNgoaiGioParam: IsNgoaiGio) {
  if (isNgoaiGioParam === IsNgoaiGio.NgoaiGio) {
    return true
  } else if (isNgoaiGioParam === IsNgoaiGio.TrongGio) {
    return false
  }

  return undefined
}

const BUU_DIEN_SUMMARY = 'BUU_DIEN_SUMMARY'
const NGOAI_GIO_SUMMARY = 'NGOAI_GIO_SUMMARY'

export default function TestReportPage() {
  const { patientTypeMap, categories, groups, tests } =
    useLoaderData() as Awaited<ReturnType<typeof testReportPageLoader>>
  const [searchParams, setSearchParams] = useSearchParams()

  const patientTypeParam = searchParams.get('patientType') ?? ANY_PATIENT_TYPE
  const isNgoaiGioParam =
    (searchParams.get('isNgoaiGio') as IsNgoaiGio) ?? IsNgoaiGio.Any

  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    useCrudPagination({
      offset: 0,
      limit: 100,
      sort: { infoAt: -1, sampleId: -1 },
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
      patientType: patientTypeParam,
      isNgoaiGio: isNgoaiGioParam,
    },
  })
  const fromDate = watch('fromDate')
  const toDate = watch('toDate')
  const patientType = watch('patientType')
  const isNgoaiGio = watch('isNgoaiGio')

  const handleSubmitFilter = ({
    fromDate,
    toDate,
    patientType,
    isNgoaiGio,
  }: FilterData) => {
    setSearchParams({
      patientType,
      isNgoaiGio,
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
        patientTypeId:
          patientType !== ANY_PATIENT_TYPE ? patientType : undefined,
        isNgoaiGio: parseIsNgoaiGio(isNgoaiGio),
      },
    }))
  }

  useEffect(() => {
    if (toDate < fromDate) {
      setValue('fromDate', toDate)
    } else {
      handleSubmit(handleSubmitFilter)()
    }
  }, [fromDate, toDate, patientType, isNgoaiGio])

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
    samples.forEach(({ results, isNgoaiGio, isTraBuuDien }) => {
      if (tempSummary[BUU_DIEN_SUMMARY] === undefined) {
        tempSummary[BUU_DIEN_SUMMARY] = 0
      }
      if (tempSummary[NGOAI_GIO_SUMMARY] === undefined) {
        tempSummary[NGOAI_GIO_SUMMARY] = 0
      }

      if (isNgoaiGio === true) {
        tempSummary[NGOAI_GIO_SUMMARY]++
      }
      if (isTraBuuDien === true) {
        tempSummary[BUU_DIEN_SUMMARY]++
      }

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
            <Grid xs={2}>
              <FormSelect
                control={control}
                size="medium"
                name="isNgoaiGio"
                label="Thời gian"
                options={[
                  { label: 'Tất cả', value: IsNgoaiGio.Any },
                  { label: 'Trong giờ', value: IsNgoaiGio.TrongGio },
                  { label: 'Ngoài giờ', value: IsNgoaiGio.NgoaiGio },
                ]}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
              />
            </Grid>
            <Grid xs={3}>
              <FormSelect
                control={control}
                size="medium"
                name="patientType"
                label="Đối tượng"
                options={[
                  { label: 'Tất cả', value: ANY_PATIENT_TYPE },
                  ...[...patientTypeMap.values()].map(({ _id, name }) => ({
                    label: name,
                    value: _id,
                  })),
                ]}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
              />
            </Grid>
            <Grid xs={3}>
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
              headerName: 'Ngày nhận',
              width: 100,
              sortable: false,
              valueGetter: ({ value }) => {
                if (value === undefined) {
                  return ''
                }
                return format(new Date(value), DATETIME_FORMAT)
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
              width: 150,
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
                    const count = summary[_id]
                    if (count > 0) {
                      return count
                    }

                    return ''
                  }

                  const { testId } =
                    row.results.find(({ testId }) => testId === _id) ?? {}
                  if (testId !== undefined) {
                    return '✓'
                  }

                  return ''
                },
              })
            ),
            {
              field: 'isTraBuuDien',
              headerName: 'Bưu điện',
              width: 80,
              sortable: false,
              editable: true,
              align: 'center',
              renderCell: ({ value }) => (
                <Typography fontWeight="bold">{value}</Typography>
              ),
              valueGetter: ({ value, row }) => {
                //@ts-ignore
                if (row?.isSummary === true) {
                  const count = summary[BUU_DIEN_SUMMARY]
                  if (count > 0) {
                    return count
                  }

                  return ''
                }

                if (value === true) {
                  return '✓'
                }
                return ''
              },
            },
            {
              field: 'isNgoaiGio',
              headerName: 'TG',
              width: 90,
              sortable: false,
              editable: true,
              renderCell: ({ value, row }) => {
                //@ts-ignore
                if (row?.isSummary === true) {
                  return <Typography fontWeight="bold">{value}</Typography>
                }

                return value
              },
              valueGetter: ({ value, row }) => {
                //@ts-ignore
                if (row?.isSummary === true) {
                  const count = summary[NGOAI_GIO_SUMMARY]
                  if (count > 0) {
                    return count
                  }

                  return ''
                }

                if (value === true) {
                  return 'Ngoài giờ'
                } else if (value === false) {
                  return 'Trong giờ'
                }
                return ''
              },
            },
          ]}
          paginationMode="server"
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
