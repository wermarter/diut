import { GridActionsCellItem } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'

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
import { Gender } from '@diut/common'

export default function EditSelectPage() {
  const { indicationMap, doctorMap } = useLoaderData() as Awaited<
    ReturnType<typeof editSelectPageLoader>
  >
  const navigate = useNavigate()

  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    offset: 0,
    limit: 10,
    sort: { infoAt: -1 },
    filter: {
      infoCompleted: true,
      sampleCompleted: false,
    },
  })

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
      const { patientId, sampleTypeIds, results } = sample
      getPatient({ id: patientId }, true).then((res) => {
        setPatients((cache) => ({
          ...cache,
          [patientId]: res.data!,
        }))
      })
      results.map(({ testId }) => {
        getTest({ id: testId }, true).then((res) => {
          setTests((cache) => ({
            ...cache,
            [testId]: res.data!,
          }))
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
    <DataTable
      cellOutline
      disableSelectionOnClick
      rows={samples?.items || []}
      autoRowHeight
      loading={isFetchingSamples || isFetchingPatients || isFetchingTests}
      getRowId={(row) => row._id}
      columns={[
        {
          field: 'sampledAt',
          headerName: 'TG lấy mẫu',
          width: 100,
          sortable: false,
          valueGetter: ({ value }) => {
            return format(new Date(value), 'dd/MM/yyyy HH:mm')
          },
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
          field: 'phoneNumber',
          headerName: 'SĐT',
          width: 120,
          sortable: false,
          valueGetter: ({ row }) => patients[row.patientId]?.phoneNumber,
        },
        {
          field: 'doctor',
          headerName: 'Bác sỹ',
          width: 100,
          sortable: false,
          valueGetter: ({ row }) => doctorMap.get(row.doctorId)?.name,
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
          field: 'indication',
          headerName: 'Chẩn đoán',
          width: 70,
          sortable: false,
          valueGetter: ({ row }) => indicationMap.get(row.indicationId)?.name,
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
              label="Sửa"
              onClick={handleEditClick(row)}
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
  )
}
