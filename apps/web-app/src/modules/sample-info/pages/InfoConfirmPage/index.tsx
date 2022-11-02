import { GridActionsCellItem } from '@mui/x-data-grid'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Gender } from '@diut/common'

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
import { useTypedSelector } from 'src/core'
import { selectUserId } from 'src/modules/auth'
import { renderCellExpand } from 'src/common/components/GridCellExpand'
import { DoctorResponseDto, useLazyDoctorFindByIdQuery } from 'src/api/doctor'
import {
  IndicationResponseDto,
  useLazyIndicationFindByIdQuery,
} from 'src/api/indication'
import {
  SampleTypeResponseDto,
  useLazySampleTypeFindByIdQuery,
} from 'src/api/sample-type'
import { TestResponseDto, useLazyTestFindByIdQuery } from 'src/api/test'
import {
  PatientTypeResponseDto,
  useLazyPatientTypeFindByIdQuery,
} from 'src/api/patient-type'
import { useCrudPagination } from 'src/common/hooks'

export default function InfoConfirmPage() {
  const userId = useTypedSelector(selectUserId)
  const navigate = useNavigate()

  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    offset: 0,
    limit: 10,
    sort: { createdAt: -1 },
    filter: {
      infoBy: userId,
      infoCompleted: false,
    },
  })

  const { data, isFetching: isFetchingSamples } = useSampleSearchQuery({
    searchSampleRequestDto: filterObj,
  })

  const [getPatient, { isFetching: isFetchingPatients }] =
    useLazyPatientFindByIdQuery()
  const [getDoctor, { isFetching: isFetchingDoctors }] =
    useLazyDoctorFindByIdQuery()
  const [getPatientType, { isFetching: isFetchingPatientTypes }] =
    useLazyPatientTypeFindByIdQuery()
  const [getIndication, { isFetching: isFetchingIndications }] =
    useLazyIndicationFindByIdQuery()
  const [getSampleType, { isFetching: isFetchingSampleTypes }] =
    useLazySampleTypeFindByIdQuery()
  const [getTest, { isFetching: isFetchingTests }] = useLazyTestFindByIdQuery()

  const [samples, setSamples] = useState<SearchSampleResponseDto>()
  const [patients, setPatients] = useState<{
    [id: string]: PatientResponseDto
  }>({})
  const [doctors, setDoctors] = useState<{
    [id: string]: DoctorResponseDto
  }>({})
  const [patientTypes, setPatientTypes] = useState<{
    [id: string]: PatientTypeResponseDto
  }>({})
  const [indications, setIndications] = useState<{
    [id: string]: IndicationResponseDto
  }>({})
  const [sampleTypes, setSampleTypes] = useState<{
    [id: string]: SampleTypeResponseDto
  }>({})
  const [tests, setTests] = useState<{
    [id: string]: TestResponseDto
  }>({})

  async function expandId(samples: SampleResponseDto[]) {
    const promises = samples.map(async (sample) => {
      const {
        patientId,
        doctorId,
        patientTypeId,
        indicationId,
        sampleTypeIds,
        results,
      } = sample
      getPatient({ id: patientId }, true).then((res) => {
        setPatients((cache) => ({
          ...cache,
          [patientId]: res.data!,
        }))
      })
      getDoctor({ id: doctorId }, true).then((res) => {
        setDoctors((cache) => ({
          ...cache,
          [doctorId]: res.data!,
        }))
      })
      getPatientType({ id: patientTypeId }, true).then((res) => {
        setPatientTypes((cache) => ({
          ...cache,
          [patientTypeId]: res.data!,
        }))
      })
      getIndication({ id: indicationId }, true).then((res) => {
        setIndications((cache) => ({
          ...cache,
          [indicationId]: res.data!,
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

  const [updateSample, { isLoading: isConfirming }] =
    useSampleUpdateByIdMutation()

  const handleConfirmClick = (sample: SampleResponseDto) => () => {
    updateSample({
      id: sample._id,
      updateSampleRequestDto: {
        infoCompleted: true,
      },
    })
  }

  const handleEditClick = (sample: SampleResponseDto) => () => {
    navigate('../edit/' + sample.patientId + '/' + sample._id)
  }

  return (
    <DataTable
      rows={samples?.items || []}
      loading={
        isFetchingSamples ||
        isFetchingPatients ||
        isFetchingDoctors ||
        isFetchingIndications ||
        isFetchingPatientTypes ||
        isFetchingSampleTypes ||
        isFetchingTests
      }
      getRowId={(row) => row._id}
      columns={[
        {
          field: 'startActions',
          headerName: 'Xác nhận',
          type: 'actions',
          width: 100,
          cellClassName: 'actions',
          getActions: ({ row }) => [
            <GridActionsCellItem
              icon={<CheckIcon />}
              label="Xác nhận"
              color="primary"
              onClick={handleConfirmClick(row)}
              disabled={isConfirming}
            />,
          ],
        },
        // {
        //   field: 'infoAt',
        //   headerName: 'TG nhận mẫu',
        //   width: 150,
        //   sortable: false,
        //   valueGetter: ({ value }) => {
        //     return format(new Date(value), 'dd/MM/yyyy HH:mm')
        //   },
        // },
        {
          field: 'sampleId',
          headerName: 'ID XN',
          width: 120,
          sortable: false,
        },
        // {
        //   field: 'externalId',
        //   headerName: 'ID PK',
        //   sortable: false,
        //   width: 120,
        //   valueGetter: ({ row }) => patients[row.patientId]?.externalId,
        // },
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
          field: 'name',
          headerName: 'Tên',
          flex: 1,
          sortable: false,
          minWidth: 200,
          valueGetter: ({ row }) => patients[row.patientId]?.name,
        },
        {
          field: 'birthYear',
          headerName: 'Năm sinh',
          width: 100,
          sortable: false,
          valueGetter: ({ row }) => patients[row.patientId]?.birthYear,
        },
        {
          field: 'gender',
          headerName: 'Giới tính',
          width: 100,
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
          field: 'phoneNumber',
          headerName: 'SĐT',
          width: 120,
          sortable: false,
          valueGetter: ({ row }) => patients[row.patientId]?.phoneNumber,
        },
        {
          field: 'address',
          headerName: 'Địa chỉ',
          width: 200,
          sortable: false,
          valueGetter: ({ row }) => patients[row.patientId]?.address,
        },
        {
          field: 'doctor',
          headerName: 'Bác sỹ',
          width: 200,
          sortable: false,
          valueGetter: ({ row }) => doctors[row.doctorId]?.name,
        },
        {
          field: 'indication',
          headerName: 'Chẩn đoán',
          width: 200,
          sortable: false,
          valueGetter: ({ row }) => indications[row.indicationId]?.name,
        },
        {
          field: 'patientType',
          headerName: 'Đối tượng',
          width: 200,
          sortable: false,
          valueGetter: ({ row }) => patientTypes[row.patientTypeId]?.name,
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
          headerName: 'Sửa TT',
          type: 'actions',
          width: 100,
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
