import { GridActionsCellItem } from '@mui/x-data-grid'
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
} from 'src/infra/api/sample'
import { DataTable } from 'src/components/DataTable'
import {
  PatientResponseDto,
  useLazyPatientFindByIdQuery,
} from 'src/infra/api/patient'
import { useCrudPagination } from 'src/shared/hooks'
import { editSelectPageLoader } from './loader'
import { useForm } from 'react-hook-form'
import {
  FormContainer,
  FormDateTimePicker,
  FormSelect,
  FormTextField,
} from 'src/components/form'
import { useTypedSelector } from 'src/core'
import { selectUserId, selectUserIsAdmin } from 'src/infra/auth'

const ANY_PATIENT_TYPE = 'ANY_PATIENT_TYPE'
const ANY_SAMPLE_ORIGIN = 'ANY_SAMPLE_ORIGIN'

interface FilterData {
  fromDate: Date
  toDate: Date
  sampleId: string
  sampleCompleted: 'all' | 'true' | 'false'
  patientType: string
  sampleOrigin: string
}

export default function EditSelectPage() {
  const { indicationMap, doctorMap, patientTypeMap, testMap, sampleOriginMap } =
    useLoaderData() as Awaited<ReturnType<typeof editSelectPageLoader>>
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
        infoCompleted: true,
        infoAt: {
          $gte: startOfDay(new Date()).toISOString(),
          $lte: endOfDay(new Date()).toISOString(),
        },
        $or: [
          {
            sampleCompleted: true,
            resultBy: userIsAdmin ? { $exists: true } : userId,
          },
          { sampleCompleted: false },
        ],
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
      sampleCompleted:
        (searchParams.get(
          'sampleCompleted',
        ) as FilterData['sampleCompleted']) ?? 'all',
      patientType: patientTypeParam,
      sampleOrigin: sampleOriginParam,
    },
  })
  const fromDate = watch('fromDate')
  const toDate = watch('toDate')
  const sampleCompleted = watch('sampleCompleted')
  const patientType = watch('patientType')
  const sampleOrigin = watch('sampleOrigin')

  const handleSubmitFilter = ({
    fromDate,
    toDate,
    sampleId,
    sampleCompleted,
    patientType,
    sampleOrigin,
  }: FilterData) => {
    setSearchParams(
      {
        sampleId,
        sampleCompleted,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
        patientType,
        sampleOrigin,
      },
      { replace: true },
    )
    let sampleCompletedObj = {}
    if (userIsAdmin) {
      sampleCompletedObj = {
        sampleCompleted:
          sampleCompleted === 'all'
            ? undefined
            : sampleCompleted === 'true'
              ? true
              : false,
      }
    } else {
      if (sampleCompleted === 'all') {
        sampleCompletedObj = {
          sampleCompleted: undefined,
          resultBy: undefined,
          $or: [
            {
              sampleCompleted: true,
              resultBy: userId,
            },
            { sampleCompleted: false },
          ],
        }
      }
      if (sampleCompleted === 'false') {
        sampleCompletedObj = {
          $or: undefined,
          sampleCompleted: false,
        }
      }
      if (sampleCompleted === 'true') {
        sampleCompletedObj = {
          $or: undefined,
          sampleCompleted: true,
          resultBy: userId,
        }
      }
    }

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
        patientTypeId:
          patientType !== ANY_PATIENT_TYPE ? patientType : undefined,
        sampleOriginId:
          sampleOrigin !== ANY_SAMPLE_ORIGIN ? sampleOrigin : undefined,
        ...sampleCompletedObj,
      },
    }))
  }

  useEffect(() => {
    if (toDate < fromDate) {
      setValue('fromDate', toDate)
    } else {
      handleSubmit(handleSubmitFilter)()
    }
  }, [fromDate, toDate, sampleCompleted, patientType, sampleOrigin])

  const {
    data,
    isFetching: isFetchingSamples,
    refetch,
  } = useSampleSearchQuery({
    searchSampleRequestDto: filterObj,
  })

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
            ...cache,
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

  const handleEditClick = (sample: SampleResponseDto) => () => {
    navigate('edit/' + sample.patientId + '/' + sample._id)
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
                name="sampleCompleted"
                label="Trạng thái"
                options={[
                  { label: 'Tất cả', value: 'all' },
                  { label: 'Đầy đủ KQ', value: 'true' },
                  { label: 'Thiếu KQ', value: 'false' },
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
              sortable: false,
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
              getActions: ({ row }) => [],
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
              field: 'phoneNumber',
              headerName: 'SĐT',
              width: 120,
              sortable: false,
              valueGetter: ({ row }) => patients[row.patientId]?.phoneNumber,
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
              sortable: false,
              cellClassName: 'actions',
              getActions: ({ row }) => [
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Sửa"
                  color={row.sampleCompleted ? 'default' : 'secondary'}
                  onClick={handleEditClick(row)}
                />,
              ],
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
