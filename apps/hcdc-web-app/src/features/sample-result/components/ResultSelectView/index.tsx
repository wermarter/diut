import { Box, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { startOfDay, subMonths } from 'date-fns'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import {
  FormContainer,
  FormDateTimePicker,
  FormSelect,
  FormTextField,
} from 'src/components/form'
import { DataTable } from 'src/components/table'
import { authSlice } from 'src/features/auth'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'
import { DiagnosisResponseDto } from 'src/infra/api/access-service/diagnosis'
import { DoctorResponseDto } from 'src/infra/api/access-service/doctor'
import { PatientTypeResponseDto } from 'src/infra/api/access-service/patient-type'
import { useSampleSearchQuery } from 'src/infra/api/access-service/sample'
import { TestResponseDto } from 'src/infra/api/access-service/test'
import { useTypedSelector } from 'src/infra/redux'
import { makeDateFilter } from 'src/shared'
import { usePagination } from 'src/shared/hooks'
import { useColumns } from './columns'

interface FormData {
  fromDate: Date | null
  toDate: Date | null
  sampleId: string
  sampleCompleted: string
  patientTypeId: string
  originId: string
}

export type EditSelectViewProps = {
  diagnosisMap: Map<string, DiagnosisResponseDto>
  originMap: Map<string, BranchResponseDto>
  doctorMap: Map<string, DoctorResponseDto>
  patientTypeMap: Map<string, PatientTypeResponseDto>
  testMap: Map<string, TestResponseDto>
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  sampleCompleted: boolean | null
  setSampleCompleted: (sampleCompleted: boolean | null) => void
  patientTypeId: string | null
  setPatientTypeId: (patientTypeId: string | null) => void
  originId: string | null
  setOriginId: (originId: string | null) => void
  sampleId: string | null
  setSampleId: (originId: string | null) => void
  fromDate: Date | null
  setFromDate: (fromDate: Date | null) => void
  toDate: Date | null
  setToDate: (toDate: Date | null) => void
}

export function ResultSelectView(props: EditSelectViewProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!

  const { filterObj, setFilterObj } = usePagination({
    offset: props.page,
    limit: props.pageSize,
    sort: { infoAt: -1, sampleId: -1 },
    populates: [{ path: 'patient' }],
    filter: { isConfirmed: true },
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
      sampleCompleted: '',
      patientTypeId: '',
      originId: '',
    },
  })
  const fromDate = watch('fromDate')
  const toDate = watch('toDate')

  useEffect(() => {
    setValue(
      'patientTypeId',
      props.patientTypeId === null ? 'null' : `"${props.patientTypeId}"`,
    )
    setValue(
      'originId',
      props.originId === null ? 'null' : `"${props.originId}"`,
    )
    setValue(
      'sampleCompleted',
      props.sampleCompleted === null
        ? 'null'
        : JSON.stringify(props.sampleCompleted),
    )
    if (props.sampleId !== null) {
      setValue('sampleId', props.sampleId)
    }

    let newFromDate = props.fromDate
    let newToDate = props.toDate
    if (
      props.fromDate === null &&
      props.toDate === null &&
      props.sampleId !== null
    ) {
      newFromDate = startOfDay(subMonths(new Date(), 12))
    }
    setValue('fromDate', newFromDate)
    setValue('toDate', newToDate)

    setFilterObj((obj) => ({
      ...obj,
      filter: {
        ...obj.filter,
        sampleId: props.sampleId
          ? { $regex: props.sampleId + '$', $options: 'i' }
          : undefined,
        infoAt: makeDateFilter(newFromDate, newToDate),
        sampleCompleted:
          props.sampleCompleted === null ? undefined : props.sampleCompleted,
        patientTypeId:
          props.patientTypeId === null ? undefined : props.patientTypeId,
        originId: props.originId === null ? undefined : props.originId,
      },
    }))
  }, [
    props.sampleId,
    props.sampleCompleted,
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
    sampleCompleted,
    patientTypeId,
    originId,
  }: FormData) => {
    props.setSampleId(sampleId.length === 0 ? null : sampleId)
    props.setFromDate(fromDate)
    props.setToDate(toDate)
    props.setSampleCompleted(JSON.parse(sampleCompleted))
    props.setPatientTypeId(JSON.parse(patientTypeId))
    props.setOriginId(JSON.parse(originId))
  }

  const columns = useColumns(
    refetch,
    props.diagnosisMap,
    props.originMap,
    props.doctorMap,
    props.patientTypeMap,
    props.testMap,
  )

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
              <FormSelect
                control={control}
                onChangeHook={(value) => {
                  props.setOriginId(JSON.parse(value))
                }}
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
              <FormDateTimePicker
                control={control}
                onChangeHook={(newFromDate) => {
                  if (newFromDate > (toDate ?? new Date())) {
                    props.setToDate(newFromDate)
                  }

                  props.setFromDate(newFromDate)
                }}
                name="fromDate"
                dateOnly
                label="Từ ngày"
              />
            </Grid>
            <Grid xs={2}>
              <FormDateTimePicker
                control={control}
                onChangeHook={(newToDate) => {
                  if (newToDate < (fromDate ?? new Date())) {
                    props.setFromDate(newToDate)
                  }

                  props.setToDate(newToDate)
                }}
                name="toDate"
                dateOnly
                label="Đến ngày"
              />
            </Grid>
            <Grid xs={2}>
              <FormSelect
                control={control}
                onChangeHook={(value) => {
                  props.setSampleCompleted(JSON.parse(value))
                }}
                size="medium"
                name="sampleCompleted"
                label="Trạng thái"
                options={[
                  { label: 'Tất cả', value: 'null' },
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
                onChangeHook={(value) =>
                  props.setPatientTypeId(JSON.parse(value))
                }
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
      <Box sx={{ overflow: 'auto', flexGrow: 1, height: '100%' }}>
        <DataTable
          cellOutline
          disableRowSelectionOnClick
          rows={samples?.items ?? []}
          autoRowHeight
          loading={isFetching}
          getRowId={(row) => row._id}
          columns={columns}
          paginationMode="server"
          rowCount={samples?.total ?? 0}
          page={samples?.offset!}
          pageSize={samples?.limit!}
          onPageChange={props.setPage}
          onPageSizeChange={props.setPageSize}
        />
      </Box>
    </Box>
  )
}
