import { GridActionsCellItem } from '@mui/x-data-grid'
import PrintIcon from '@mui/icons-material/Print'
import EditIcon from '@mui/icons-material/Edit'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format, startOfDay, endOfDay } from 'date-fns'
import { Gender, Permission } from '@diut/hcdc'
import { DATETIME_FORMAT } from '@diut/common'
import { Box, Paper, IconButton } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useForm } from 'react-hook-form'
import LoopIcon from '@mui/icons-material/Loop'

import {
  SampleResponseDto,
  SearchSampleResponseDto,
  useSampleSearchQuery,
} from 'src/infra/api/access-service/sample'
import { DataTable } from 'src/components/table'
import {
  PatientResponseDto,
  useLazyPatientFindByIdQuery,
} from 'src/infra/api/access-service/patient'
import { usePagination } from 'src/shared/hooks'
import {
  FormAutocomplete,
  FormContainer,
  FormDateTimePicker,
  FormSelect,
  FormTextField,
} from 'src/components/form'
import { SinglePrintDialog } from './SinglePrintDialog'
import { printSelectPageLoader } from './loader'
import { useCheckPermissionAnyOf } from 'src/infra/auth'

const ANY_PATIENT_TYPE = 'ANY_PATIENT_TYPE'
const ANY_SAMPLE_ORIGIN = 'ANY_SAMPLE_ORIGIN'

interface FilterData {
  fromDate: Date
  toDate: Date
  sampleId: string
  patientId: string
  patientType: string
  sampleOrigin: string
  testIds: string[]
}

export function PrintSelectPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const patientTypeParam = searchParams.get('patientType') ?? ANY_PATIENT_TYPE
  const sampleOriginParam =
    searchParams.get('sampleOrigin') ?? ANY_SAMPLE_ORIGIN
  const {
    printForms,
    patientTypeMap,
    testMap,
    sampleTypeMap,
    tests,
    sampleOriginMap,
  } = useLoaderData() as Awaited<ReturnType<typeof printSelectPageLoader>>

  const userCanPrint = useCheckPermissionAnyOf([Permission.PrintResult])
  const userCanEdit = useCheckPermissionAnyOf([Permission.ManageResult])

  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    usePagination({
      offset: 0,
      limit: 10,
      sort: { infoAt: -1, sampleId: -1 },
      filter: {
        infoCompleted: true,
        infoAt: {
          $gte: startOfDay(new Date()).toISOString(),
          $lte: endOfDay(new Date()).toISOString(),
        },
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
      patientId: searchParams.get('patientId') ?? '',
      patientType: patientTypeParam,
      sampleOrigin: sampleOriginParam,
      testIds: searchParams.getAll('testIds') ?? [],
    },
  })
  const fromDate = watch('fromDate')
  const toDate = watch('toDate')
  const patientType = watch('patientType')
  const sampleOrigin = watch('sampleOrigin')

  useEffect(() => {
    if (toDate < fromDate) {
      setValue('fromDate', toDate)
    } else {
      handleSubmit(handleSubmitFilter)()
    }
  }, [fromDate, toDate, patientType, sampleOrigin])

  const {
    data,
    isFetching: isFetchingSamples,
    refetch,
  } = useSampleSearchQuery(filterObj)

  const handleSubmitFilter = ({
    fromDate,
    toDate,
    sampleId,
    patientId,
    patientType,
    sampleOrigin,
    testIds,
  }: FilterData) => {
    setSearchParams(
      {
        sampleId,
        patientId,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
        patientType,
        sampleOrigin,
        testIds,
      },
      { replace: true },
    )

    return setFilterObj((obj) => ({
      ...obj,
      filter: {
        ...obj.filter,
        sampleId:
          patientId.length === 0 && sampleId.length > 0
            ? { $regex: sampleId + '$', $options: 'i' }
            : undefined,
        patientId: patientId.length > 0 ? patientId : undefined,
        infoAt:
          sampleId.length > 0 || patientId.length > 0
            ? undefined
            : {
                $gte: startOfDay(fromDate).toISOString(),
                $lte: endOfDay(toDate).toISOString(),
              },
        patientTypeId:
          patientType !== ANY_PATIENT_TYPE ? patientType : undefined,
        sampleOriginId:
          sampleOrigin !== ANY_SAMPLE_ORIGIN ? sampleOrigin : undefined,
        results:
          testIds?.length > 0
            ? {
                $elemMatch: {
                  testId: {
                    $in: testIds,
                  },
                },
              }
            : undefined,
      },
    }))
  }

  const [getPatient, { isFetching: isFetchingPatients }] =
    useLazyPatientFindByIdQuery()
  const [samples, setSamples] = useState<SearchSampleResponseDto>()
  const [patients, setPatients] = useState<{
    [id: string]: PatientResponseDto
  }>({})

  async function expandId(samples: SampleResponseDto[]) {
    const promises = samples.map(async (sample) => {
      const { patientId } = sample
      getPatient({ id: patientId }, true).then((res) => {
        setPatients((cache) =>
          Object.assign({}, cache, {
            // ...cache,
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

  const [printSample, setPrintSample] = useState<SampleResponseDto | null>(null)

  const handleConfirmClick = (sample: SampleResponseDto) => () => {
    setPrintSample(sample)
  }

  const handleEditClick = (sample: SampleResponseDto) => () => {
    navigate('/result/edit/' + sample.patientId + '/' + sample._id)
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
                disabled={
                  watch('sampleId')?.length > 0 ||
                  watch('patientId')?.length > 0
                }
              />
            </Grid>
            <Grid xs={2}>
              <FormDateTimePicker
                control={control}
                name="toDate"
                dateOnly
                label="Đến ngày"
                disabled={
                  watch('sampleId')?.length > 0 ||
                  watch('patientId')?.length > 0
                }
              />
            </Grid>
            <Grid xs={2}>
              <FormAutocomplete
                groupBy={(option) => option?.category?.name ?? ''}
                control={control}
                name="testIds"
                options={tests}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option._id}
                label="Chọn XN"
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
                disabled={watch('patientId')?.length > 0}
              />
              <input type="submit" style={{ display: 'none' }} />
            </Grid>
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
              getActions: ({ row }) => [
                <GridActionsCellItem
                  icon={<PrintIcon />}
                  label="In KQ"
                  color={row.printedBy != null ? 'default' : 'primary'}
                  onClick={handleConfirmClick(row)}
                  disabled={!userCanPrint}
                />,
              ],
            },
            {
              field: 'infoAt',
              headerName: 'TG nhận bệnh',
              width: 150,
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
              width: 180,
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
                  .filter(({ testCompleted }) => testCompleted)
                  .map(({ testId }) => testMap.get(testId)?.name)
                  .join(', ')
              },
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
                  label="Sửa KQ"
                  color={row.sampleCompleted ? 'default' : 'secondary'}
                  onClick={handleEditClick(row)}
                  disabled={!userCanEdit}
                />,
              ],
            },
          ]}
          paginationMode="server"
          rowCount={samples?.total!}
          page={samples?.offset!}
          pageSize={samples?.limit!}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </Box>
      <SinglePrintDialog
        printForms={printForms.filter(({ _id }) => {
          const testIds = printSample?.results
            .filter(({ testCompleted }) => testCompleted)
            .map(({ testId }) => testId)
          const printFormIds = testIds?.map(
            (testId) => testMap.get(testId)?.printForm,
          )
          return printFormIds?.some((printFormId) => printFormId === _id)
        })}
        sample={printSample}
        key={printSample?._id}
        sampleTypes={printSample?.sampleTypeIds?.map(
          (sampleTypeId) => sampleTypeMap.get(sampleTypeId)!,
        )}
        onClose={() => {
          setPrintSample(null)
        }}
      />
    </Box>
  )
}
