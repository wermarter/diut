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
import { renderCellExpand } from 'src/common/components/GridCellExpand'
import {
  SampleTypeResponseDto,
  useLazySampleTypeFindByIdQuery,
} from 'src/api/sample-type'
import { TestResponseDto, useLazyTestFindByIdQuery } from 'src/api/test'
import { useCrudPagination } from 'src/common/hooks'
import { useTypedSelector } from 'src/core'
import { selectUserId } from 'src/modules/auth'

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
  const [getSampleType, { isFetching: isFetchingSampleTypes }] =
    useLazySampleTypeFindByIdQuery()
  const [getTest, { isFetching: isFetchingTests }] = useLazyTestFindByIdQuery()

  const [samples, setSamples] = useState<SearchSampleResponseDto>()
  const [patients, setPatients] = useState<{
    [id: string]: PatientResponseDto
  }>({})
  const [sampleTypes, setSampleTypes] = useState<{
    [id: string]: SampleTypeResponseDto
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
      sampleTypeIds.map((sampleTypeId) => {
        getSampleType({ id: sampleTypeId }, true).then((res) => {
          setSampleTypes((cache) => ({
            ...cache,
            [sampleTypeId]: res.data!,
          }))
        })
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
    alert(JSON.stringify(sample))
  }

  const [updateSample, { isLoading: isConfirming }] =
    useSampleUpdateByIdMutation()

  const handleEditClick = (sample: SampleResponseDto) => () => {
    updateSample({
      id: sample._id,
      updateSampleRequestDto: {
        sampleCompleted: false,
      },
    }).then(() => {
      navigate('..')
    })
  }

  return (
    <DataTable
      rows={samples?.items || []}
      loading={
        isFetchingSamples ||
        isFetchingPatients ||
        isFetchingSampleTypes ||
        isFetchingTests
      }
      getRowId={(row) => row._id}
      columns={[
        {
          field: 'startActions',
          type: 'actions',
          width: 50,
          cellClassName: 'actions',
          getActions: ({ row }) => [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Sửa"
              onClick={handleEditClick(row)}
            />,
          ],
        },
        {
          field: 'infoAt',
          headerName: 'TG nhận mẫu',
          width: 150,
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
          flex: 1,
          sortable: false,
          minWidth: 200,
          valueGetter: ({ row }) => patients[row.patientId]?.name,
        },
        {
          field: 'tests',
          headerName: 'Chỉ định XN',
          width: 300,
          sortable: false,
          renderCell: renderCellExpand,
          valueGetter: ({ row }) => {
            return row.results
              .map(({ testId, bioProductName }) => {
                if (bioProductName?.length! > 0) {
                  return `${tests[testId]?.name}(${bioProductName})`
                } else {
                  return tests[testId]?.name
                }
              })
              .join(', ')
          },
        },
        {
          field: 'sampledAt',
          headerName: 'TG lấy mẫu',
          width: 150,
          sortable: false,
          valueGetter: ({ value }) => {
            return format(new Date(value), 'dd/MM/yyyy HH:mm')
          },
        },
        {
          field: 'sampleTypes',
          headerName: 'Loại mẫu',
          width: 300,
          sortable: false,
          renderCell: renderCellExpand,
          valueGetter: ({ row }) => {
            return row.sampleTypeIds
              .map((sampleTypeId) => {
                return sampleTypes[sampleTypeId]?.name
              })
              .join(', ')
          },
        },
        {
          field: 'endActions',
          headerName: 'In',
          type: 'actions',
          width: 100,
          sortable: false,
          cellClassName: 'actions',
          getActions: ({ row }) => [
            <GridActionsCellItem
              icon={<PrintIcon />}
              label="In"
              color="primary"
              onClick={handleConfirmClick(row)}
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
