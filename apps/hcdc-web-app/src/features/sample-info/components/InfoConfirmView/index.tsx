import { Box, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
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
import {
  SampleSearchRequestDto,
  useSampleSearchQuery,
} from 'src/infra/api/access-service/sample'
import { TestResponseDto } from 'src/infra/api/access-service/test'
import { useTypedSelector } from 'src/infra/redux'
import { makeDateFilter } from 'src/shared'
import { usePagination } from 'src/shared/hooks'
import { useColumns } from './columns'

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

  const { filterObj, setFilterObj } = usePagination<SampleSearchRequestDto>({
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

  useEffect(() => {
    if (toDate < fromDate) {
      props.setFromDate(toDate)
    }
  }, [fromDate, toDate])

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
                onChangeHook={props.setFromDate}
                name="fromDate"
                dateOnly
                label="Từ ngày"
              />
            </Grid>
            <Grid xs={2}>
              <FormDateTimePicker
                control={control}
                onChangeHook={props.setToDate}
                name="toDate"
                dateOnly
                label="Đến ngày"
              />
            </Grid>
            <Grid xs={2}>
              <FormSelect
                control={control}
                onChangeHook={(value) => {
                  props.setIsConfirmed(JSON.parse(value))
                }}
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
      <Box sx={{ height: '100%', overflow: 'auto' }} id="hehe">
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
