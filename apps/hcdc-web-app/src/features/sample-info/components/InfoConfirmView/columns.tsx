import { DATETIME_FORMAT } from '@diut/common'
import {
  AuthSubject,
  PatientGender,
  SampleAction,
  checkPermission,
  createAbility,
} from '@diut/hcdc'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import LoopIcon from '@mui/icons-material/Loop'
import { IconButton } from '@mui/material'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { format } from 'date-fns'
import { identity } from 'lodash'
import { MouseEventHandler, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { authSlice } from 'src/features/auth'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'
import { DiagnosisResponseDto } from 'src/infra/api/access-service/diagnosis'
import { DoctorResponseDto } from 'src/infra/api/access-service/doctor'
import { PatientTypeResponseDto } from 'src/infra/api/access-service/patient-type'
import {
  OmittedSampleResponseDto,
  useSampleUpdateInfoByIdMutation,
} from 'src/infra/api/access-service/sample'
import { TestResponseDto } from 'src/infra/api/access-service/test'
import { useTypedSelector } from 'src/infra/redux'
import { urlInfoEditPage } from '../../pages'

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

  const [updateSample, { isLoading: isConfirming }] =
    useSampleUpdateInfoByIdMutation()
  const handleConfirmClick = useCallback((sample: OmittedSampleResponseDto) => {
    return () => {
      updateSample({
        id: sample._id,
        sampleUpdateInfoRequestDto: {
          isConfirmed: true,
        },
      })
    }
  }, [])
  const handleEditClick = useCallback(
    (sample: OmittedSampleResponseDto): MouseEventHandler => {
      return (e) => {
        e.preventDefault()
        navigate(urlInfoEditPage({ sampleId: sample._id }))
      }
    },
    [],
  )

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
        getActions: ({ row }) =>
          row.isConfirmed
            ? []
            : [
                <GridActionsCellItem
                  icon={<CheckIcon />}
                  label="Xác nhận"
                  color="primary"
                  onClick={handleConfirmClick(row)}
                  disabled={isConfirming}
                />,
              ],
      },
      {
        field: 'infoAt',
        headerName: 'Nhận bệnh',
        width: 100,
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
        field: 'isTraBuuDien',
        headerName: 'BĐ',
        width: 60,
        align: 'center',
        sortable: false,
        valueGetter: ({ value }) => {
          if (value === true) {
            return '✓'
          }
          return ''
        },
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
            disabled={
              !checkPermission(
                userAbility,
                AuthSubject.Sample,
                SampleAction.UpdateInfo,
                { ...row } as any,
              )
            }
            icon={<EditIcon />}
            label="Sửa"
            onClick={handleEditClick(row)}
            component="a"
            // @ts-ignore
            href={urlInfoEditPage({ sampleId: row._id })}
          />,
        ],
      },
    ]
  }, [diagnosisMap, doctorMap, patientTypeMap, testMap, originMap, userAbility])
  return columns
}
