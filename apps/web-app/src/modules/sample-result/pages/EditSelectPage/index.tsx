import { GridActionsCellItem } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format, startOfDay, endOfDay } from 'date-fns'
import { DATETIME_FORMAT, Gender } from '@diut/common'
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

const ANY_PATIENT_TYPE = 'ANY_PATIENT_TYPE'

interface FilterData {
  fromDate: Date
  toDate: Date
  sampleId: string
  sampleCompleted: 'all' | 'true' | 'false'
  patientType: string
}

export default function EditSelectPage() {
  const { indicationMap, doctorMap, patientTypeMap } =
    useLoaderData() as Awaited<ReturnType<typeof editSelectPageLoader>>
  const userId = useTypedSelector(selectUserId)
  const userIsAdmin = useTypedSelector(selectUserIsAdmin)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const patientTypeParam = searchParams.get('patientType') ?? ANY_PATIENT_TYPE

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
        searchParams.get('fromDate') !== null
          ? new Date(searchParams.get('fromDate')!)
          : new Date(),
      toDate:
        searchParams.get('toDate') !== null
          ? new Date(searchParams.get('toDate')!)
          : new Date(),
      sampleId: searchParams.get('sampleId') ?? '',
      sampleCompleted:
        (searchParams.get(
          'sampleCompleted'
        ) as FilterData['sampleCompleted']) ?? 'all',
      patientType: patientTypeParam,
    },
  })
  const fromDate = watch('fromDate')
  const toDate = watch('toDate')
  const sampleCompleted = watch('sampleCompleted')
  const patientType = watch('patientType')

  const handleSubmitFilter = ({
    fromDate,
    toDate,
    sampleId,
    sampleCompleted,
    patientType,
  }: FilterData) => {
    setSearchParams(
      {
        sampleId,
        sampleCompleted,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
        patientType,
      },
      { replace: true }
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
  }, [fromDate, toDate, sampleCompleted, patientType])

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
                label="T??? ng??y"
                disabled={watch('sampleId')?.length > 0}
              />
            </Grid>
            <Grid xs={2}>
              <FormDateTimePicker
                control={control}
                name="toDate"
                dateOnly
                label="?????n ng??y"
                disabled={watch('sampleId')?.length > 0}
              />
            </Grid>
            <Grid xs={2}>
              <FormSelect
                control={control}
                size="medium"
                name="sampleCompleted"
                label="Tr???ng th??i"
                options={[
                  { label: 'T???t c???', value: 'all' },
                  { label: '?????y ????? KQ', value: 'true' },
                  { label: 'Thi???u KQ', value: 'false' },
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
                label="?????i t?????ng"
                options={[
                  { label: 'T???t c???', value: ANY_PATIENT_TYPE },
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
              <FormTextField
                fullWidth
                control={control}
                name="sampleId"
                label="ID x??t nghi???m"
              />
            </Grid>
            <input type="submit" style={{ display: 'none' }} />
          </Grid>
        </FormContainer>
      </Paper>
      <Box sx={{ flexGrow: 1 }}>
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
              headerName: 'Nh???n b???nh',
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
              headerName: 'T??n',
              sortable: false,
              width: 100,
              valueGetter: ({ row }) => patients[row.patientId]?.name,
            },
            {
              field: 'birthYear',
              headerName: 'N??m',
              width: 60,
              sortable: false,
              valueGetter: ({ row }) => patients[row.patientId]?.birthYear,
            },
            {
              field: 'gender',
              headerName: 'Gi???i',
              width: 60,
              sortable: false,
              valueGetter: ({ row }) => {
                if (patients[row.patientId]?.gender === Gender.Female) {
                  return 'N???'
                } else {
                  return 'Nam'
                }
              },
            },
            {
              field: 'address',
              headerName: '?????a ch???',
              width: 80,
              sortable: false,
              valueGetter: ({ row }) => patients[row.patientId]?.address,
            },
            {
              field: 'phoneNumber',
              headerName: 'S??T',
              width: 120,
              sortable: false,
              valueGetter: ({ row }) => patients[row.patientId]?.phoneNumber,
            },
            {
              field: 'doctor',
              headerName: 'B??c s???',
              width: 100,
              sortable: false,
              valueGetter: ({ row }) => doctorMap.get(row.doctorId)?.name,
            },
            {
              field: 'tests',
              headerName: 'Ch??? ?????nh',
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
              headerName: 'C??',
              width: 70,
              sortable: false,
              valueGetter: ({ row }) =>
                indicationMap.get(row.indicationId)?.name,
            },
            {
              field: 'patientType',
              headerName: '?????i T.',
              width: 70,
              sortable: false,
              valueGetter: ({ row }) =>
                patientTypeMap.get(row.patientTypeId)?.name,
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
                  label="S???a"
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
