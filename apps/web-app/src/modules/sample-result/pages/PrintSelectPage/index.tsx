import { GridActionsCellItem } from '@mui/x-data-grid'
import PrintIcon from '@mui/icons-material/Print'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format, startOfDay, endOfDay } from 'date-fns'
import { Gender } from '@diut/common'
import { Box, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import {
  SampleResponseDto,
  SearchSampleResponseDto,
  useLazySamplePrintByIdQuery,
  useSampleSearchQuery,
  useSampleUpdateByIdMutation,
} from 'src/api/sample'
import { DataTable } from 'src/common/components/DataTable'
import {
  PatientResponseDto,
  useLazyPatientFindByIdQuery,
} from 'src/api/patient'
import { TestResponseDto, useLazyTestFindByIdQuery } from 'src/api/test'
import { useCrudPagination } from 'src/common/hooks'
import { useTypedSelector } from 'src/core'
import { selectUserId, selectUserIsAdmin } from 'src/modules/auth'
import {
  FormContainer,
  FormDateTimePicker,
  FormTextField,
} from 'src/common/form-elements'
import { useForm } from 'react-hook-form'

interface FilterData {
  date: Date
  sampleId: string
}

export default function PrintSelectPage() {
  const userId = useTypedSelector(selectUserId)
  const userIsAdmin = useTypedSelector(selectUserIsAdmin)
  const navigate = useNavigate()

  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    useCrudPagination({
      offset: 0,
      limit: 10,
      sort: { createdAt: -1 },
      filter: {
        infoCompleted: true,
        sampleCompleted: true,
        resultBy: userIsAdmin ? undefined : userId,
      },
    })

  const { control, handleSubmit, watch } = useForm<FilterData>({
    defaultValues: {
      date: new Date(),
      sampleId: '',
    },
  })
  const date = watch('date')
  useEffect(() => {
    handleSubmit(handleSubmitFilter)()
  }, [date])

  const { data, isFetching: isFetchingSamples } = useSampleSearchQuery({
    searchSampleRequestDto: filterObj,
  })

  const handleSubmitFilter = ({ date, sampleId }: FilterData) => {
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
      },
    }))
  }

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

  const [printSample, { isFetching: isDownloading }] =
    useLazySamplePrintByIdQuery()

  const handleConfirmClick = (sample: SampleResponseDto) => () => {
    printSample({ id: sample._id })
  }

  const [updateSample, { isLoading: isEditing }] = useSampleUpdateByIdMutation()

  const handleEditClick = (sample: SampleResponseDto) => () => {
    updateSample({
      id: sample._id,
      updateSampleRequestDto: {
        sampleCompleted: false,
      },
    }).then(() => {
      navigate('/result/edit/' + sample.patientId + '/' + sample._id)
    })
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
              <FormTextField
                fullWidth
                control={control}
                name="sampleId"
                label="ID XN"
              />
            </Grid>
            <Grid xs={7}>
              <input type="submit" style={{ display: 'none' }} />
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
            field: 'startActions',
            type: 'actions',
            width: 50,
            sortable: false,
            cellClassName: 'actions',
            getActions: ({ row }) => [
              <GridActionsCellItem
                icon={<PrintIcon />}
                label="In KQ"
                color="primary"
                onClick={handleConfirmClick(row)}
              />,
            ],
          },
          {
            field: 'infoAt',
            headerName: 'TG nhận bệnh',
            width: 150,
            sortable: false,
            valueGetter: ({ value }) => {
              return format(new Date(value), 'dd/MM/yyyy HH:mm')
            },
          },
          {
            field: 'externalId',
            headerName: 'ID PK',
            sortable: false,
            width: 100,
            valueGetter: ({ row }) => patients[row.patientId]?.externalId,
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
            field: 'endActions',
            type: 'actions',
            width: 50,
            sortable: false,
            cellClassName: 'actions',
            getActions: ({ row }) => [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Sửa KQ"
                onClick={handleEditClick(row)}
                disabled={isEditing}
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
