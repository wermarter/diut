import { GridActionsCellItem } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format, startOfDay, endOfDay } from 'date-fns'
import { Gender } from '@diut/common'
import { Box, Paper } from '@mui/material'
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
import { TestResponseDto, useLazyTestFindByIdQuery } from 'src/api/test'
import { useCrudPagination } from 'src/common/hooks'
import { editSelectPageLoader } from './loader'
import { useForm } from 'react-hook-form'
import {
  FormContainer,
  FormDateTimePicker,
  FormSelect,
  FormTextField,
} from 'src/common/form-elements'
import { useTypedSelector } from 'src/core'
import { selectUserId, selectUserIsAdmin } from 'src/modules/auth'

interface FilterData {
  date: Date
  sampleId: string
  sampleCompleted: 'all' | 'true' | 'false'
}

export default function EditSelectPage() {
  const { indicationMap, doctorMap } = useLoaderData() as Awaited<
    ReturnType<typeof editSelectPageLoader>
  >
  const userId = useTypedSelector(selectUserId)
  const userIsAdmin = useTypedSelector(selectUserIsAdmin)
  const navigate = useNavigate()

  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    useCrudPagination({
      offset: 0,
      limit: 10,
      sort: { infoAt: -1 },
      filter: {
        infoCompleted: true,
        $or: [
          {
            sampleCompleted: true,
            resultBy: userIsAdmin ? { $exists: true } : userId,
          },
          { sampleCompleted: false },
        ],
      },
    })

  const { control, handleSubmit, watch } = useForm<FilterData>({
    defaultValues: {
      date: new Date(),
      sampleId: '',
      sampleCompleted: 'all',
    },
  })
  const date = watch('date')
  const sampleCompleted = watch('sampleCompleted')

  const handleSubmitFilter = ({
    date,
    sampleId,
    sampleCompleted,
  }: FilterData) => {
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
            ? { $regex: '^' + sampleId, $options: 'i' }
            : undefined,
        infoAt:
          sampleId.length > 0
            ? undefined
            : {
                $gte: startOfDay(date).toISOString(),
                $lte: endOfDay(date).toISOString(),
              },
        ...sampleCompletedObj,
      },
    }))
  }

  useEffect(() => {
    handleSubmit(handleSubmitFilter)()
  }, [date, sampleCompleted])

  const { data, isFetching: isFetchingSamples } = useSampleSearchQuery({
    searchSampleRequestDto: filterObj,
  })

  const [getPatient, { isFetching: isFetchingPatients }] =
    useLazyPatientFindByIdQuery()
  const [getTest, { isFetching: isFetchingTests }] = useLazyTestFindByIdQuery()

  const [samples, setSamples] = useState<SearchSampleResponseDto>()
  const [patients, setPatients] = useState<{
    [id: string]: PatientResponseDto
  }>({})
  const [tests, setTests] = useState<{
    [id: string]: TestResponseDto
  }>({})

  async function expandId(samples: SampleResponseDto[]) {
    const promises = samples.map(async (sample) => {
      const { patientId, results } = sample
      getPatient({ id: patientId }, true).then((res) => {
        setPatients((cache) =>
          Object.assign({}, cache, {
            ...cache,
            [patientId]: res.data!,
          })
        )
      })
      results.map(({ testId }) => {
        getTest({ id: testId }, true).then((res) => {
          setTests((cache) =>
            Object.assign({}, cache, {
              ...cache,
              [testId]: res.data!,
            })
          )
        })
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
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 2, mb: 2 }} elevation={4}>
        <FormContainer onSubmit={handleSubmit(handleSubmitFilter)}>
          <Grid container spacing={2}>
            <Grid xs={2}>
              <FormDateTimePicker
                control={control}
                name="date"
                dateOnly
                label="Ngày nhận bệnh"
                disabled={watch('sampleId')?.length > 0}
              />
            </Grid>
            <Grid xs={3}>
              <FormSelect
                control={control}
                size="medium"
                name="sampleCompleted"
                label="Trạng thái"
                options={[
                  { label: 'Tất cả', value: 'all' },
                  { label: 'Đầy đủ kết quả', value: 'true' },
                  { label: 'Thiếu kết quả', value: 'false' },
                ]}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
              />
            </Grid>
            <Grid xs={4}>
              <input type="submit" style={{ display: 'none' }} />
            </Grid>
            <Grid xs={3}>
              <FormTextField
                fullWidth
                control={control}
                name="sampleId"
                label="ID XN"
              />
            </Grid>
          </Grid>
        </FormContainer>
      </Paper>
      <DataTable
        cellOutline
        disableSelectionOnClick
        rows={samples?.items || []}
        autoRowHeight
        loading={isFetchingSamples || isFetchingPatients || isFetchingTests}
        getRowId={(row) => row._id}
        columns={[
          {
            field: 'infoAt',
            headerName: 'Nhận bệnh',
            width: 100,
            sortable: false,
            valueGetter: ({ value }) => {
              return format(new Date(value), 'dd/MM/yyyy HH:mm')
            },
          },
          {
            field: 'sampleId',
            headerName: 'ID XN',
            width: 120,
            sortable: false,
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
            headerName: 'Chỉ định XN',
            minWidth: 100,
            flex: 1,
            sortable: false,
            valueGetter: ({ row }) => {
              return row.results
                .map(({ testId }) => tests[testId]?.name)
                .join(', ')
            },
          },
          {
            field: 'indication',
            headerName: 'Chẩn đoán',
            width: 70,
            sortable: false,
            valueGetter: ({ row }) => indicationMap.get(row.indicationId)?.name,
          },
          {
            field: 'endActions',
            type: 'actions',
            width: 50,
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
        rowsPerPageOptions={[5, 10, 20, 100]}
        rowCount={samples?.total ?? 0}
        page={samples?.offset ?? 0}
        pageSize={samples?.limit ?? 10}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </Box>
  )
}
