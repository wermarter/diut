import { GridActionsCellItem } from '@mui/x-data-grid'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef } from 'react'
import { format } from 'date-fns'
import {
  AuthSubject,
  PatientGender,
  SampleAction,
  checkPermission,
  createAbility,
} from '@diut/hcdc'
import { DATETIME_FORMAT } from '@diut/common'
import { Box, Paper, IconButton } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import LoopIcon from '@mui/icons-material/Loop'
import { useForm } from 'react-hook-form'

import {
  OmittedSampleResponseDto,
  useSampleSearchQuery,
  useSampleUpdateInfoByIdMutation,
} from 'src/infra/api/access-service/sample'
import { DataTable } from 'src/components/table'
import { useTypedSelector } from 'src/infra/redux'
import { usePagination } from 'src/shared/hooks'
import {
  FormContainer,
  FormDateTimePicker,
  FormSelect,
  FormTextField,
} from 'src/components/form'
import { DiagnosisResponseDto } from 'src/infra/api/access-service/diagnosis'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'
import { DoctorResponseDto } from 'src/infra/api/access-service/doctor'
import { PatientTypeResponseDto } from 'src/infra/api/access-service/patient-type'
import { TestResponseDto } from 'src/infra/api/access-service/test'
import { authSlice } from 'src/features/auth'
import { makeDateFilter } from 'src/shared'
import { urlInfoEditPage } from '../../pages/InfoEditPage'

interface FormData {
  fromDate: Date
  toDate: Date
  sampleId: string
  isConfirmed: string
  patientTypeId: string
  originId: string
}

export type InfoConfirmViewProps = {
  diagnosisMap: Map<string, DiagnosisResponseDto>
  originMap: Map<string, BranchResponseDto>
  doctorMap: Map<string, DoctorResponseDto>
  patientTypeMap: Map<string, PatientTypeResponseDto>
  testMap: Map<string, TestResponseDto>
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  isConfirmed: boolean | null
  setIsConfirmed: (isConfirmed: boolean | null) => void
  patientTypeId: string | null
  setPatientTypeId: (patientTypeId: string | null) => void
  originId: string | null
  setOriginId: (originId: string | null) => void
  sampleId: string | null
  setSampleId: (originId: string | null) => void
  fromDate: Date
  setFromDate: (fromDate: Date) => void
  toDate: Date
  setToDate: (toDate: Date) => void
}

export function InfoConfirmView(props: InfoConfirmViewProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const userPermissions = useTypedSelector(
    authSlice.selectors.selectUserPermissions,
  )
  const userAbility = useMemo(() => {
    return createAbility(userPermissions)
  }, [userPermissions])
  const navigate = useNavigate()

  const { filterObj, setFilterObj } = usePagination({
    offset: props.page,
    limit: props.pageSize,
    sort: { infoAt: -1, sampleId: -1 },
    populates: [{ path: 'patient' }],
  })

  useEffect(() => {
    if (branchId) {
      setFilterObj((prev) => ({
        ...prev,
        filter: {
          ...filterObj.filter,
          branchId,
        },
      }))
    }
  }, [branchId])

  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      fromDate: props.fromDate,
      toDate: props.toDate,
      sampleId: '',
      isConfirmed: '',
      patientTypeId: '',
      originId: '',
    },
  })

  useEffect(() => {
    setValue('fromDate', props.fromDate)
    setValue('toDate', props.toDate)
    setValue(
      'patientTypeId',
      props.patientTypeId === null ? 'null' : `"${props.patientTypeId}"`,
    )
    setValue(
      'originId',
      props.originId === null ? 'null' : `"${props.originId}"`,
    )
    setValue(
      'isConfirmed',
      props.isConfirmed === null ? 'null' : JSON.stringify(props.isConfirmed),
    )
    if (props.sampleId !== null) {
      setValue('sampleId', props.sampleId)
    }

    setFilterObj((obj) => ({
      ...obj,
      filter: {
        ...obj.filter,
        sampleId: props.sampleId
          ? { $regex: props.sampleId + '$', $options: 'i' }
          : undefined,
        infoAt: makeDateFilter(props.fromDate, props.toDate),
        isConfirmed: props.isConfirmed === null ? undefined : props.isConfirmed,
        patientTypeId:
          props.patientTypeId === null ? undefined : props.patientTypeId,
        originId: props.originId === null ? undefined : props.originId,
      },
    }))
  }, [
    props.sampleId,
    props.isConfirmed,
    props.patientTypeId,
    props.originId,
    props.fromDate,
    props.toDate,
  ])

  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
  }, [])
  const {
    data: samples,
    isFetching,
    refetch,
  } = useSampleSearchQuery(filterObj, {
    skip: isFirstRun.current,
  })

  const handleSubmitFilter = ({
    fromDate,
    toDate,
    sampleId,
    isConfirmed,
    patientTypeId,
    originId,
  }: FormData) => {
    props.setSampleId(sampleId.length === 0 ? null : sampleId)
    props.setFromDate(fromDate)
    props.setToDate(toDate)
    props.setIsConfirmed(JSON.parse(isConfirmed))
    props.setPatientTypeId(JSON.parse(patientTypeId))
    props.setOriginId(JSON.parse(originId))
  }

  const fromDate = watch('fromDate')
  const toDate = watch('toDate')
  const isConfirmed = watch('isConfirmed')
  const patientTypeId = watch('patientTypeId')
  const originId = watch('originId')

  useEffect(() => {
    if (toDate < fromDate) {
      setValue('fromDate', toDate)
    } else {
      handleSubmit(handleSubmitFilter)()
    }
  }, [fromDate, toDate, isConfirmed, patientTypeId, originId])

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
                name="isConfirmed"
                label="Trạng thái"
                options={[
                  { label: 'Tất cả', value: 'null' },
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
                name="patientTypeId"
                label="Đối tượng"
                options={[
                  { label: 'Tất cả', value: 'null' },
                  ...[...props.patientTypeMap.values()].map(
                    ({ _id, name }) => ({
                      label: name,
                      value: `"${_id}"`,
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
                name="originId"
                label="Đơn vị"
                options={[
                  { label: 'Tất cả', value: 'null' },
                  ...[...props.originMap.values()].map(({ _id, name }) => ({
                    label: name,
                    value: `"${_id}"`,
                  })),
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
          rows={samples?.items ?? []}
          autoRowHeight
          loading={isFetching}
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
              valueGetter: ({ row }) => row.patient?.name,
            },
            {
              field: 'birthYear',
              headerName: 'Năm',
              width: 60,
              sortable: false,
              valueGetter: ({ row }) => row.patient?.birthYear,
            },
            {
              field: 'gender',
              headerName: 'Giới',
              width: 60,
              sortable: false,
              valueGetter: ({ row }) => {
                if (row.patient?.gender === PatientGender.Female) {
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
              valueGetter: ({ row }) => row.patient?.address,
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
              field: 'patientTypeId',
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
          rowCount={samples?.total!}
          page={samples?.offset!}
          pageSize={samples?.limit!}
          onPageChange={props.setPage}
          onPageSizeChange={props.setPageSize}
        />
      </Box>
    </Box>
  )
}
