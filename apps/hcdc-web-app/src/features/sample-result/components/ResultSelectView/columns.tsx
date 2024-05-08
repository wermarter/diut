import { useNavigate } from 'react-router-dom'
import {
  AuthSubject,
  PatientGender,
  Sample,
  SampleAction,
  checkPermission,
  createAbility,
} from '@diut/hcdc'
import { format, parseISO } from 'date-fns'
import { useCallback, useMemo } from 'react'
import { DATETIME_FORMAT } from '@diut/common'
import { IconButton } from '@mui/material'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import LoopIcon from '@mui/icons-material/Loop'
import EditIcon from '@mui/icons-material/Edit'
import { identity } from 'lodash'

import { OmittedSampleResponseDto } from 'src/infra/api/access-service/sample'
import { DiagnosisResponseDto } from 'src/infra/api/access-service/diagnosis'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'
import { DoctorResponseDto } from 'src/infra/api/access-service/doctor'
import { PatientTypeResponseDto } from 'src/infra/api/access-service/patient-type'
import { TestResponseDto } from 'src/infra/api/access-service/test'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { urlResultEditPage } from '../../pages'

export const useColumns = (
  refetch: () => void,
  diagnosisMap: Map<string, DiagnosisResponseDto>,
  originMap: Map<string, BranchResponseDto>,
  doctorMap: Map<string, DoctorResponseDto>,
  patientTypeMap: Map<string, PatientTypeResponseDto>,
  testMap: Map<string, TestResponseDto>,
): GridColDef<OmittedSampleResponseDto>[] => {
  const navigate = useNavigate()

  const userPermissions = useTypedSelector(
    authSlice.selectors.selectUserPermissions,
  )
  const userAbility = useMemo(() => {
    return createAbility(userPermissions)
  }, [userPermissions])

  const handleEditClick = useCallback((sample: OmittedSampleResponseDto) => {
    return () => {
      navigate(urlResultEditPage({ sampleId: sample._id }))
    }
  }, [])

  const columns: GridColDef<OmittedSampleResponseDto>[] = useMemo(() => {
    return [
      {
        field: 'startActions',
        type: 'actions',
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
        getActions: () => [],
      },
      {
        field: 'infoAt',
        headerName: 'Nhận bệnh',
        width: 100,
        sortable: false,
        valueGetter: ({ value }) => {
          return format(parseISO(value), DATETIME_FORMAT)
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
        width: 100,
        valueGetter: ({ row }) => row.patient?.name,
      },
      {
        field: 'birthYear',
        headerName: 'Năm',
        width: 60,
        sortable: false,
        valueGetter: ({ row }) => row.patient?.birthYear,
      },
      {
        field: 'gender',
        headerName: 'Giới',
        width: 60,
        sortable: false,
        valueGetter: ({ row }) => {
          if (row.patient?.gender === PatientGender.Female) {
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
        valueGetter: ({ row }) => row.patient?.address,
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
        headerName: 'Chỉ định',
        minWidth: 100,
        flex: 1,
        sortable: false,
        valueGetter: ({ row }) => {
          return row.results
            .map(({ testId }) => testMap.get(testId)?.name)
            .filter(identity)
            .join(', ')
        },
      },
      {
        field: 'diagnosis',
        headerName: 'CĐ',
        width: 70,
        sortable: false,
        valueGetter: ({ row }) => diagnosisMap.get(row.diagnosisId)?.name,
      },
      {
        field: 'patientTypeId',
        headerName: 'Đối T.',
        width: 70,
        sortable: false,
        valueGetter: ({ row }) => patientTypeMap.get(row.patientTypeId)?.name,
      },
      {
        field: 'endActions',
        type: 'actions',
        width: 60,
        cellClassName: 'actions',
        getActions: ({ row }) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Sửa"
            color={row.sampleCompleted ? 'default' : 'secondary'}
            onClick={handleEditClick(row)}
            disabled={
              !checkPermission(
                userAbility,
                AuthSubject.Sample,
                SampleAction.UpdateResult,
                { ...row } as unknown as Sample,
              )
            }
          />,
        ],
      },
    ]
  }, [diagnosisMap, doctorMap, patientTypeMap, testMap, originMap])
  return columns
}
