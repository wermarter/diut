import { useLoaderData, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format, startOfDay, endOfDay } from 'date-fns'
import { DATETIME_FORMAT } from '@diut/common'
import { Box, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { GridColDef } from '@mui/x-data-grid'
import { useForm } from 'react-hook-form'

import {
  SampleResponseDto,
  SampleSearchResponseDto,
  useSampleSearchQuery,
} from 'src/infra/api/access-service/sample'
import { DataTable } from 'src/components/table'
import {
  PatientResponseDto,
  useLazyPatientFindByIdQuery,
} from 'src/infra/api/access-service/patient'
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

interface FormData {
  fromDate: Date
  toDate: Date
  isNgoaiGio: string
  patientTypeId: string
  originId: string
}

export type SoNhanMauViewProps = {
  origins: BranchResponseDto[]
  patientTypes: PatientTypeResponseDto[]
  tests: TestResponseDto[]

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

  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
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
      fromDate: props.fromDate.toISOString(),
      toDate: props.toDate.toISOString(),
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

  const { data, isFetching } = useReportQuerySoNhanMauQuery(filterObj)

  return (
    <Box
      sx={{
        p: 2,
        height: '100%',
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
                name="isNgoaiGio"
                label="Thời gian"
                options={[
                  { label: 'Tất cả', value: IsNgoaiGio.Any },
                  { label: 'Trong giờ', value: IsNgoaiGio.TrongGio },
                  { label: 'Ngoài giờ', value: IsNgoaiGio.NgoaiGio },
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
              <input type="submit" style={{ display: 'none' }} />
            </Grid>
          </Grid>
        </FormContainer>
      </Paper>
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        <DataTable
          cellOutline
          rows={
            data?.items.concat({
              _id: 'test-report-summary',
              isSummary: true,
            } as any) ?? []
          }
          autoRowHeight
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
            ...props.tests.map((categoryName) => ({
              groupId: categoryName,
              children: groups[categoryName].map(({ _id }) => ({
                field: _id,
              })),
            })),
          ]}
          columns={[
            {
              field: 'infoAt',
              headerName: 'Ngày nhận',
              width: 100,
              sortable: false,
              valueGetter: ({ value }) => {
                if (value === undefined) {
                  return ''
                }
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
              width: 150,
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
                if (patients[row.patientId]?.gender === undefined) {
                  return ''
                }

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
              field: 'patientType',
              headerName: 'Đối tượng',
              width: 90,
              sortable: false,
              valueGetter: ({ row }) =>
                patientTypeMap.get(row.patientTypeId)?.name,
            },
            ...tests.map(
              ({ _id, name }): GridColDef<SampleResponseDto> => ({
                field: _id,
                headerName: name,
                width: 80,
                sortable: false,
                align: 'center',
                renderCell: ({ value }) => (
                  <Typography fontWeight="bold">{value}</Typography>
                ),
                valueGetter: ({ row }) => {
                  //@ts-ignore
                  if (row?.isSummary === true) {
                    const count = summary[_id]
                    if (count > 0) {
                      return count
                    }

                    return ''
                  }

                  const { testId } =
                    row.results.find(({ testId }) => testId === _id) ?? {}
                  if (testId != undefined) {
                    return '✓'
                  }

                  return ''
                },
              }),
            ),
            {
              field: 'isTraBuuDien',
              headerName: 'Bưu điện',
              width: 80,
              sortable: false,
              editable: true,
              align: 'center',
              renderCell: ({ value }) => (
                <Typography fontWeight="bold">{value}</Typography>
              ),
              valueGetter: ({ value, row }) => {
                //@ts-ignore
                if (row?.isSummary === true) {
                  const count = summary[BUU_DIEN_SUMMARY]
                  if (count > 0) {
                    return count
                  }

                  return ''
                }

                if (value === true) {
                  return '✓'
                }
                return ''
              },
            },
            {
              field: 'isNgoaiGio',
              headerName: 'TG',
              width: 90,
              sortable: false,
              editable: true,
              renderCell: ({ value, row }) => {
                //@ts-ignore
                if (row?.isSummary === true) {
                  return <Typography fontWeight="bold">{value}</Typography>
                }

                return value
              },
              valueGetter: ({ value, row }) => {
                //@ts-ignore
                if (row?.isSummary === true) {
                  const count = summary[NGOAI_GIO_SUMMARY]
                  if (count > 0) {
                    return count
                  }

                  return ''
                }

                if (value === true) {
                  return 'Ngoài giờ'
                } else if (value === false) {
                  return 'Trong giờ'
                }
                return ''
              },
            },
          ]}
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
