import { useEffect, useRef } from 'react'
import { Box, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { omit } from 'lodash'

import {
  OmittedSampleResponseDto,
  useReportExportSoNhanMauMutation,
} from 'src/infra/api/access-service/report'
import { DataTable } from 'src/components/table'
import { usePagination } from 'src/shared/hooks'
import {
  FormContainer,
  FormDateTimePicker,
  FormSelect,
} from 'src/components/form'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'
import { PatientTypeResponseDto } from 'src/infra/api/access-service/patient-type'
import { TestResponseDto } from 'src/infra/api/access-service/test'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { makeDateFilter } from 'src/shared'
import {
  ReportQuerySoNhanMauRequestDto,
  useReportQuerySoNhanMauQuery,
} from 'src/infra/api/access-service/report'
import { useColumns } from './columns'

interface FormData {
  fromDate: Date
  toDate: Date
  isNgoaiGio: string
  patientTypeId: string
  originId: string
}

export type SoNhanMauViewProps = {
  origins: BranchResponseDto[]
  patientTypeMap: Map<string, PatientTypeResponseDto>
  tests: TestResponseDto[]
  categories: {
    groupId: string
    children: {
      field: string
    }[]
  }[]

  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  isNgoaiGio: boolean | null
  setIsNgoaiGio: (isNgoaiGio: boolean | null) => void
  patientTypeId: string | null
  setPatientTypeId: (patientTypeId: string | null) => void
  originId: string | null
  setOriginId: (originId: string | null) => void
  fromDate: Date
  setFromDate: (fromDate: Date) => void
  toDate: Date
  setToDate: (toDate: Date) => void
}

export function SoNhanMauView(props: SoNhanMauViewProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!

  const { filterObj, setFilterObj } =
    usePagination<ReportQuerySoNhanMauRequestDto>({
      offset: props.page,
      limit: props.pageSize,
      fromDate: makeDateFilter(props.fromDate, props.toDate).$gte,
      toDate: makeDateFilter(props.fromDate, props.toDate).$lte,
      patientTypeId: props.patientTypeId ?? undefined,
      isNgoaiGio: props.isNgoaiGio ?? undefined,
      originId: props.originId ?? undefined,
      branchId,
    })

  useEffect(() => {
    if (branchId) {
      setFilterObj((prev) => ({
        ...prev,
        branchId,
      }))
    }
  }, [branchId])

  const { control, watch, setValue } = useForm<FormData>({
    defaultValues: {
      fromDate: props.fromDate,
      toDate: props.toDate,
      isNgoaiGio: '',
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
      'isNgoaiGio',
      props.isNgoaiGio === null ? 'null' : JSON.stringify(props.isNgoaiGio),
    )

    setFilterObj((obj) => ({
      ...obj,
      fromDate: makeDateFilter(props.fromDate, props.toDate).$gte,
      toDate: makeDateFilter(props.fromDate, props.toDate).$lte,
      isNgoaiGio: props.isNgoaiGio ?? undefined,
      patientTypeId:
        props.patientTypeId === null ? undefined : props.patientTypeId,
      originId: props.originId === null ? undefined : props.originId,
    }))
  }, [
    props.isNgoaiGio,
    props.patientTypeId,
    props.originId,
    props.fromDate,
    props.toDate,
  ])

  const fromDate = watch('fromDate')
  const toDate = watch('toDate')

  useEffect(() => {
    if (toDate < fromDate) {
      props.setFromDate(toDate)
    }
  }, [fromDate, toDate])

  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
  }, [])
  const { data, isFetching } = useReportQuerySoNhanMauQuery(filterObj, {
    skip: isFirstRun.current,
  })

  const columns = useColumns({
    summary: data?.summary,
    categories: props.categories,
    patientTypeMap: props.patientTypeMap,
    tests: props.tests,
  })

  const [exportDownload, { isLoading }] = useReportExportSoNhanMauMutation()

  return (
    <Box
      sx={{
        p: 2,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper sx={{ p: 2, mb: 2 }} elevation={4}>
        <FormContainer>
          <Grid container spacing={2}>
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
                  props.setIsNgoaiGio(JSON.parse(value))
                }}
                size="medium"
                name="isNgoaiGio"
                label="Thời gian"
                options={[
                  { label: 'Tất cả', value: 'null' },
                  { label: 'Trong giờ', value: 'false' },
                  { label: 'Ngoài giờ', value: 'true' },
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
                  ...props.origins.map(({ _id, name }) => ({
                    label: name,
                    value: `"${_id}"`,
                  })),
                ]}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
              />
            </Grid>
            <Grid xs={2}>
              <input type="submit" style={{ display: 'none' }} />
              <LoadingButton
                variant="outlined"
                fullWidth
                sx={{ height: '100%' }}
                disabled={isLoading}
                loading={isLoading}
                onClick={() => {
                  exportDownload(omit(filterObj, ['limit', 'offset']))
                }}
              >
                Download
              </LoadingButton>
            </Grid>
          </Grid>
        </FormContainer>
      </Paper>
      <Box sx={{ overflow: 'auto', flexGrow: 1, width: '100%' }}>
        <DataTable
          cellOutline
          rows={
            data?.items.concat({
              _id: 'test-report-summary',
              isSummary: true,
            } as unknown as OmittedSampleResponseDto) ?? []
          }
          autoRowHeight
          rowSelectionModel={'test-report-summary'}
          loading={isFetching}
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
            ...props.categories,
          ]}
          columns={columns}
          paginationMode="server"
          rowCount={data?.total ?? 0}
          page={data?.offset!}
          pageSize={data?.limit!}
          onPageChange={props.setPage}
          onPageSizeChange={props.setPageSize}
        />
      </Box>
    </Box>
  )
}
