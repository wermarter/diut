import { GridActionsCellItem } from '@mui/x-data-grid'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format, startOfDay, endOfDay } from 'date-fns'
import {
  AuthSubject,
  PatientGender,
  SampleAction,
  checkPermission,
} from '@diut/hcdc'
import { DATETIME_FORMAT } from '@diut/common'
import { Box, Paper, IconButton } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import LoopIcon from '@mui/icons-material/Loop'

import {
  OmittedSampleResponseDto,
  SampleSearchResponseDto,
  useSampleSearchQuery,
  useSampleUpdateInfoByIdMutation,
} from 'src/infra/api/access-service/sample'
import { DataTable } from 'src/components/table'
import {
  PatientResponseDto,
  useLazyPatientFindByIdQuery,
} from 'src/infra/api/access-service/patient'
import { useTypedSelector } from 'src/infra/redux'
import { usePagination } from 'src/shared/hooks'
import {
  FormContainer,
  FormDateTimePicker,
  FormSelect,
  FormTextField,
} from 'src/components/form'
import { useForm } from 'react-hook-form'
import { DiagnosisResponseDto } from 'src/infra/api/access-service/diagnosis'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'
import { DoctorResponseDto } from 'src/infra/api/access-service/doctor'
import { PatientTypeResponseDto } from 'src/infra/api/access-service/patient-type'
import { TestResponseDto } from 'src/infra/api/access-service/test'
import { authSlice } from 'src/features/auth'
import { makeDateFilter } from 'src/shared'
import { urlInfoEditPage } from '../../pages/InfoEditPage'

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

export type InfoConfirmViewProps = {
  diagnosisMap: Map<string, DiagnosisResponseDto>
  sampleOriginMap: Map<string, BranchResponseDto>
  doctorMap: Map<string, DoctorResponseDto>
  patientTypeMap: Map<string, PatientTypeResponseDto>
  testMap: Map<string, TestResponseDto>
}

export function InfoConfirmView(props: InfoConfirmViewProps) {
  const userAbility = useTypedSelector(authSlice.selectors.selectAbility)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const patientTypeParam = searchParams.get('patientType') ?? ANY_PATIENT_TYPE
  const sampleOriginParam =
    searchParams.get('sampleOrigin') ?? ANY_SAMPLE_ORIGIN

  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    usePagination({
      offset: 0,
      limit: 10,
      sort: { infoAt: -1, sampleId: -1 },
      filter: {
        infoAt: makeDateFilter(),
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
          sampleId.length > 0 ? undefined : makeDateFilter(fromDate, toDate),
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

  const [samples, setSamples] = useState<SampleSearchResponseDto>()
  const [patients, setPatients] = useState<{
    [id: string]: PatientResponseDto
  }>({})

  async function expandId(samples: OmittedSampleResponseDto[]) {
    const promises = samples.map(async (sample) => {
      const { patientId, results } = sample
      getPatient(patientId, true).then((res) => {
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
    useSampleUpdateInfoByIdMutation()

  const handleConfirmClick = (sample: OmittedSampleResponseDto) => () => {
    updateSample({
      id: sample._id,
      sampleUpdateInfoRequestDto: {
        isConfirmed: true,
      },
    })
  }

  const handleEditClick = (sample: OmittedSampleResponseDto) => () => {
    navigate(
      urlInfoEditPage({ sampleId: sample._id, patientId: sample.patientId }),
    )
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
                  ...[...props.patientTypeMap.values()].map(
                    ({ _id, name }) => ({
                      label: name,
                      value: _id,
                    }),
                  ),
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
                  ...[...props.sampleOriginMap.values()].map(
                    ({ _id, name }) => ({
                      label: name,
                      value: _id,
                    }),
                  ),
                ]}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
              />
            </Grid>
            <Grid xs={2}>
              <FormTextField
                focused
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
                row.isConfirmed
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
                if (patients[row.patientId]?.gender === PatientGender.Female) {
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
              valueGetter: ({ row }) => props.doctorMap.get(row.doctorId)?.name,
            },
            {
              field: 'tests',
              headerName: 'Chỉ định',
              minWidth: 100,
              flex: 1,
              sortable: false,
              valueGetter: ({ row }) => {
                return row.results
                  .map(({ testId }) => props.testMap.get(testId)?.name)
                  .join(', ')
              },
            },
            {
              field: 'diagnosis',
              headerName: 'CĐ',
              width: 70,
              sortable: false,
              valueGetter: ({ row }) =>
                props.diagnosisMap.get(row.diagnosisId)?.name,
            },
            {
              field: 'patientType',
              headerName: 'Đối T.',
              width: 70,
              sortable: false,
              valueGetter: ({ row }) =>
                props.patientTypeMap.get(row.patientTypeId)?.name,
            },
            {
              field: 'endActions',
              type: 'actions',
              width: 60,
              cellClassName: 'actions',
              getActions: ({ row }) =>
                checkPermission(
                  userAbility,
                  AuthSubject.Sample,
                  SampleAction.UpdateInfo,
                  { ...row } as any,
                ) || row.isConfirmed === false
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
