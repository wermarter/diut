import { GridActionsCellItem } from '@mui/x-data-grid'
import PrintIcon from '@mui/icons-material/Print'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'

import {
  SampleResponseDto,
  SearchSampleResponseDto,
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
import { selectUserId } from 'src/modules/auth'
import { Gender } from '@diut/common'

export default function PrintSelectPage() {
  const userId = useTypedSelector(selectUserId)
  const navigate = useNavigate()

  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    offset: 0,
    limit: 10,
    sort: { createdAt: -1 },
    filter: {
      infoCompleted: true,
      sampleCompleted: true,
      resultBy: userId,
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
      const { patientId, results } = sample
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

  const handleConfirmClick = (sample: SampleResponseDto) => () => {
    navigate('/result/print/' + sample._id)
  }

  const [updateSample, { isLoading: isEditing }] = useSampleUpdateByIdMutation()

  const handleEditClick = (sample: SampleResponseDto) => () => {
    updateSample({
      id: sample._id,
      updateSampleRequestDto: {
        sampleCompleted: false,
      },
    }).then(() => {
      navigate('/result')
    })
  }

  return (
    <DataTable
      rows={samples?.items || []}
      autoRowHeight
      loading={isFetchingSamples || isFetchingPatients || isFetchingTests}
      getRowId={(row) => row._id}
      columns={[
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
          headerName: 'Năm sinh',
          width: 60,
          sortable: false,
          valueGetter: ({ row }) => patients[row.patientId]?.birthYear,
        },
        {
          field: 'gender',
          headerName: 'Giới tính',
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
          field: 'actions',
          type: 'actions',
          width: 100,
          sortable: false,
          cellClassName: 'actions',
          getActions: ({ row }) => [
            <GridActionsCellItem
              icon={<PrintIcon />}
              label="In KQ"
              color="primary"
              onClick={handleConfirmClick(row)}
            />,
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
  )
}
