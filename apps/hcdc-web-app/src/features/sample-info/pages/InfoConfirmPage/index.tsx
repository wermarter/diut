import { GridActionsCellItem } from '@mui/x-data-grid'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format, startOfDay, endOfDay } from 'date-fns'
import { Gender } from '@diut/hcdc'
import { DATETIME_FORMAT } from '@diut/common'
import { Box, Paper, IconButton } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import LoopIcon from '@mui/icons-material/Loop'

import {
  SampleResponseDto,
  SearchSampleResponseDto,
  useSampleSearchQuery,
  useSampleUpdateByIdMutation,
} from 'src/infra/api/access-service/sample'
import { DataTable } from 'src/components/table'
import {
  PatientResponseDto,
  useLazyPatientFindByIdQuery,
} from 'src/infra/api/access-service/patient'
import { useTypedSelector } from 'src/core'
import { selectUserId, selectUserIsAdmin } from 'src/infra/auth'
import { useCrudPagination } from 'src/shared/hooks'
import { infoConfirmPageLoader } from './loader'
import {
  FormContainer,
  FormDateTimePicker,
  FormSelect,
  FormTextField,
} from 'src/components/form'
import { useForm } from 'react-hook-form'

const ANY_PATIENT_TYPE = 'ANY_PATIENT_TYPE'
const ANY_SAMPLE_ORIGIN = 'ANY_SAMPLE_ORIGIN'

interface FilterData {
  fromDate: Date
  toDate: Date
  sampleId: string
  infoCompleted: 'all' | 'true' | 'false'
  patientType: string
  sampleOrigin: string
}

export default function InfoConfirmPage() {
  const { indicationMap, doctorMap, patientTypeMap, testMap, sampleOriginMap } =
    useLoaderData() as Awaited<ReturnType<typeof infoConfirmPageLoader>>
  const userId = useTypedSelector(selectUserId)
  const userIsAdmin = useTypedSelector(selectUserIsAdmin)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const patientTypeParam = searchParams.get('patientType') ?? ANY_PATIENT_TYPE
  const sampleOriginParam =
    searchParams.get('sampleOrigin') ?? ANY_SAMPLE_ORIGIN

  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    useCrudPagination({
      offset: 0,
      limit: 10,
      sort: { infoAt: -1, sampleId: -1 },
      filter: {
        infoAt: {
          $gte: startOfDay(new Date()).toISOString(),
          $lte: endOfDay(new Date()).toISOString(),
        },
      },
    })

  const { control, handleSubmit, watch, setValue } = useForm<FilterData>({
    defaultValues: {
      fromDate:
        searchParams.get('fromDate') != null
          ? new Date(searchParams.get('fromDate')!)
          : new Date(),
      toDate:
        searchParams.get('toDate') != null
          ? new Date(searchParams.get('toDate')!)
          : new Date(),
      sampleId: searchParams.get('sampleId') ?? '',
      infoCompleted:
        (searchParams.get('infoCompleted') as FilterData['infoCompleted']) ??
        'all',
      patientType: patientTypeParam,
      sampleOrigin: sampleOriginParam,
    },
  })
  const fromDate = watch('fromDate')
  const toDate = watch('toDate')
  const infoCompleted = watch('infoCompleted')
  const patientType = watch('patientType')
  const sampleOrigin = watch('sampleOrigin')

  const {
    data,
    isFetching: isFetchingSamples,
    refetch,
  } = useSampleSearchQuery(filterObj)

  const handleSubmitFilter = ({
    fromDate,
    toDate,
    sampleId,
    infoCompleted,
    patientType,
    sampleOrigin,
  }: FilterData) => {
    setSearchParams(
      {
        sampleId,
        infoCompleted,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
        patientType,
        sampleOrigin,
      },
      { replace: true },
    )
    return setFilterObj((obj) => ({
      ...obj,
      filter: {
        ...obj.filter,
        sampleId:
          sampleId.length > 0
            ? { $regex: sampleId + '$', $options: 'i' }
            : undefined,
        infoAt:
          sampleId.length > 0
            ? undefined
            : {
                $gte: startOfDay(fromDate).toISOString(),
                $lte: endOfDay(toDate).toISOString(),
              },
        infoCompleted:
          infoCompleted === 'all'
            ? undefined
            : infoCompleted === 'true'
              ? true
              : false,
        patientTypeId:
          patientType !== ANY_PATIENT_TYPE ? patientType : undefined,
        sampleOriginId:
          sampleOrigin !== ANY_SAMPLE_ORIGIN ? sampleOrigin : undefined,
      },
    }))
  }

  useEffect(() => {
    if (toDate < fromDate) {
      setValue('fromDate', toDate)
    } else {
      handleSubmit(handleSubmitFilter)()
    }
  }, [fromDate, toDate, infoCompleted, patientType, sampleOrigin])

  const [getPatient, { isFetching: isFetchingPatients }] =
    useLazyPatientFindByIdQuery()

  const [samples, setSamples] = useState<SearchSampleResponseDto>()
  const [patients, setPatients] = useState<{
    [id: string]: PatientResponseDto
  }>({})

  async function expandId(samples: SampleResponseDto[]) {
    const promises = samples.map(async (sample) => {
      const { patientId, results } = sample
      getPatient({ id: patientId }, true).then((res) => {
        setPatients((cache) =>
          Object.assign({}, cache, {
            [patientId]: res.data!,
          }),
        )
      })
    })
    return Promise.all(promises)
  }

  useEffect(() => {
    if (!isFetchingSamples) {
      expandId(data?.items!)
      setSamples(data!)
    }
  }, [isFetchingSamples, JSON.stringify(filterObj)])

  const [updateSample, { isLoading: isConfirming }] =
    useSampleUpdateByIdMutation()

  const handleConfirmClick = (sample: SampleResponseDto) => () => {
    updateSample({
      id: sample._id,
      updateSampleRequestDto: {
        infoCompleted: true,
      },
    })
  }

  const handleEditClick = (sample: SampleResponseDto) => () => {
    navigate('../edit/' + sample.patientId + '/' + sample._id)
  }

  return (
    <Box
      sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Paper sx={{ p: 2, mb: 2 }} elevation={4}>
        <FormContainer
          onSubmit={handleSubmit(handleSubmitFilter)}
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid xs={2}>
              <FormDateTimePicker
                control={control}
                name="fromDate"
                dateOnly
                label="Từ ngày"
                disabled={watch('sampleId')?.length > 0}
              />
            </Grid>
            <Grid xs={2}>
              <FormDateTimePicker
                control={control}
                name="toDate"
                dateOnly
                label="Đến ngày"
                disabled={watch('sampleId')?.length > 0}
              />
            </Grid>
            <Grid xs={2}>
              <FormSelect
                control={control}
                size="medium"
                name="infoCompleted"
                label="Trạng thái"
                options={[
                  { label: 'Tất cả', value: 'all' },
                  { label: 'Đã xác nhận', value: 'true' },
                  { label: 'Chưa xác nhận', value: 'false' },
                ]}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
              />
            </Grid>
            <Grid xs={2}>
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
            <Grid xs={2}>
              <FormSelect
                control={control}
                size="medium"
                name="sampleOrigin"
                label="Đơn vị"
                options={[
                  { label: 'Tất cả', value: ANY_SAMPLE_ORIGIN },
                  ...[...sampleOriginMap.values()].map(({ _id, name }) => ({
                    label: name,
                    value: _id,
                  })),
                ]}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
              />
            </Grid>
            <Grid xs={2}>
              <FormTextField
                fullWidth
                control={control}
                name="sampleId"
                label="ID xét nghiệm"
              />
            </Grid>
            <input type="submit" style={{ display: 'none' }} />
          </Grid>
        </FormContainer>
      </Paper>
      <Box sx={{ flexGrow: 1 }}>
        <DataTable
          cellOutline
          disableRowSelectionOnClick
          rows={samples?.items || []}
          autoRowHeight
          loading={isFetchingSamples || isFetchingPatients}
          getRowId={(row) => row._id}
          columns={[
            {
              field: 'startActions',
              type: 'actions',
              width: 60,
              cellClassName: 'actions',
              renderHeader: () => (
                <IconButton
                  size="small"
                  onClick={() => {
                    refetch()
                  }}
                >
                  <LoopIcon />
                </IconButton>
              ),
              getActions: ({ row }) =>
                row.infoCompleted
                  ? []
                  : [
                      <GridActionsCellItem
                        icon={<CheckIcon />}
                        label="Xác nhận"
                        color="primary"
                        onClick={handleConfirmClick(row)}
                        disabled={isConfirming}
                      />,
                    ],
            },
            {
              field: 'infoAt',
              headerName: 'Nhận bệnh',
              width: 100,
              sortable: false,
              valueGetter: ({ value }) => {
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
              field: 'isTraBuuDien',
              headerName: 'BĐ',
              width: 60,
              align: 'center',
              sortable: false,
              valueGetter: ({ value }) => {
                if (value === true) {
                  return '✓'
                }
                return ''
              },
            },
            {
              field: 'doctor',
              headerName: 'Bác sỹ',
              width: 100,
              sortable: false,
              valueGetter: ({ row }) => doctorMap.get(row.doctorId)?.name,
            },
            {
              field: 'tests',
              headerName: 'Chỉ định',
              minWidth: 100,
              flex: 1,
              sortable: false,
              valueGetter: ({ row }) => {
                return row.results
                  .map(({ testId }) => testMap.get(testId)?.name)
                  .join(', ')
              },
            },
            {
              field: 'indication',
              headerName: 'CĐ',
              width: 70,
              sortable: false,
              valueGetter: ({ row }) =>
                indicationMap.get(row.indicationId)?.name,
            },
            {
              field: 'patientType',
              headerName: 'Đối T.',
              width: 70,
              sortable: false,
              valueGetter: ({ row }) =>
                patientTypeMap.get(row.patientTypeId)?.name,
            },
            {
              field: 'endActions',
              type: 'actions',
              width: 60,
              cellClassName: 'actions',
              getActions: ({ row }) =>
                userIsAdmin ||
                row.infoBy === userId ||
                row.infoCompleted === false
                  ? [
                      <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Sửa"
                        onClick={handleEditClick(row)}
                      />,
                    ]
                  : [],
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
