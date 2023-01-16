import { GridActionsCellItem } from '@mui/x-data-grid'
import PrintIcon from '@mui/icons-material/Print'
import EditIcon from '@mui/icons-material/Edit'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format, startOfDay, endOfDay } from 'date-fns'
import { DATETIME_FORMAT, Gender, Permission } from '@diut/common'
import { Box, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useForm } from 'react-hook-form'

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
import {
  FormContainer,
  FormDateTimePicker,
  FormSelect,
  FormTextField,
} from 'src/common/form-elements'
import { SinglePrintDialog } from './SinglePrintDialog'
import {
  SampleTypeResponseDto,
  useLazySampleTypeFindByIdQuery,
} from 'src/api/sample-type'
import { printSelectPageLoader } from './loader'
import { useTypedSelector } from 'src/core'
import { selectUserPermissions } from 'src/modules/auth'

const ANY_PATIENT_TYPE = 'ANY_PATIENT_TYPE'

interface FilterData {
  fromDate: Date
  toDate: Date
  sampleId: string
  patientId: string
  patientType: string
}

export default function PrintSelectPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const patientTypeParam = searchParams.get('patientType') ?? ANY_PATIENT_TYPE
  const { printFormData, patientTypeMap } = useLoaderData() as Awaited<
    ReturnType<typeof printSelectPageLoader>
  >

  const userPermissions = useTypedSelector(selectUserPermissions)
  const userCanPrint = userPermissions.includes(Permission.PrintResult)
  const userCanEdit = userPermissions.includes(Permission.ManageResult)

  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    useCrudPagination({
      offset: 0,
      limit: 10,
      sort: { createdAt: -1, sampleId: -1 },
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
        searchParams.get('fromDate') !== null
          ? new Date(searchParams.get('fromDate')!)
          : new Date(),
      toDate:
        searchParams.get('toDate') !== null
          ? new Date(searchParams.get('toDate')!)
          : new Date(),
      sampleId: searchParams.get('sampleId') ?? '',
      patientId: searchParams.get('patientId') ?? '',
      patientType: patientTypeParam,
    },
  })
  const fromDate = watch('fromDate')
  const toDate = watch('toDate')
  const patientType = watch('patientType')

  useEffect(() => {
    if (toDate < fromDate) {
      setValue('fromDate', toDate)
    } else {
      handleSubmit(handleSubmitFilter)()
    }
  }, [fromDate, toDate, patientType])

  const { data, isFetching: isFetchingSamples } = useSampleSearchQuery({
    searchSampleRequestDto: filterObj,
  })

  const handleSubmitFilter = ({
    fromDate,
    toDate,
    sampleId,
    patientId,
    patientType,
  }: FilterData) => {
    setSearchParams(
      {
        sampleId,
        patientId,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
        patientType,
      },
      { replace: true }
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
      },
    }))
  }

  const [getPatient, { isFetching: isFetchingPatients }] =
    useLazyPatientFindByIdQuery()
  const [getTest, { isFetching: isFetchingTests }] = useLazyTestFindByIdQuery()
  const [getSampleType, { isFetching: isFetchingSampleTypes }] =
    useLazySampleTypeFindByIdQuery()

  const [samples, setSamples] = useState<SearchSampleResponseDto>()
  const [patients, setPatients] = useState<{
    [id: string]: PatientResponseDto
  }>({})
  const [tests, setTests] = useState<{
    [id: string]: TestResponseDto
  }>({})
  const [sampleTypes, setSampleTypes] = useState<{
    [id: string]: SampleTypeResponseDto
  }>({})

  async function expandId(samples: SampleResponseDto[]) {
    const promises = samples.map(async (sample) => {
      const { patientId, results, sampleTypeIds } = sample
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
      sampleTypeIds.map((sampleTypeId) => {
        getSampleType({ id: sampleTypeId }, true).then((res) => {
          setSampleTypes((cache) =>
            Object.assign({}, cache, {
              ...cache,
              [sampleTypeId]: res.data!,
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
            <Grid xs={3}>
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
              <input type="submit" style={{ display: 'none' }} />
            </Grid>
            <Grid xs={3}>
              <FormTextField
                fullWidth
                control={control}
                name="sampleId"
                label="ID xét nghiệm"
                disabled={watch('patientId')?.length > 0}
              />
            </Grid>
          </Grid>
        </FormContainer>
      </Paper>
      <Box sx={{ flexGrow: 1 }}>
        <DataTable
          cellOutline
          disableSelectionOnClick
          rows={samples?.items || []}
          autoRowHeight
          loading={
            isFetchingSamples ||
            isFetchingPatients ||
            isFetchingTests ||
            isFetchingSampleTypes
          }
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
                  color={row.sampleCompleted ? 'default' : 'secondary'}
                  onClick={handleEditClick(row)}
                  disabled={!userCanEdit}
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
      <SinglePrintDialog
        printFormData={printFormData.items.filter(({ _id }) => {
          const testIds = printSample?.results
            .filter(({ testCompleted }) => testCompleted)
            .map(({ testId }) => testId)
          const printForms = testIds?.map((testId) => tests[testId].printForm)
          return printForms?.some((printFormId) => printFormId === _id)
        })}
        sample={printSample}
        key={printSample?._id}
        sampleTypes={printSample?.sampleTypeIds?.map(
          (sampleTypeId) => sampleTypes[sampleTypeId]
        )}
        onClose={() => {
          setPrintSample(null)
        }}
      />
    </Box>
  )
}
