import { useNavigate } from 'react-router-dom'
import {
  AuthSubject,
  PatientGender,
  SampleAction,
  checkPermission,
  createAbility,
} from '@diut/hcdc'
import { format } from 'date-fns'
import { useCallback, useMemo } from 'react'
import { DATETIME_FORMAT } from '@diut/common'
import { IconButton } from '@mui/material'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import LoopIcon from '@mui/icons-material/Loop'
import EditIcon from '@mui/icons-material/Edit'
import PrintIcon from '@mui/icons-material/Print'

import { OmittedSampleResponseDto } from 'src/infra/api/access-service/sample'
import { BranchResponseDto } from 'src/infra/api/access-service/branch'
import { PatientTypeResponseDto } from 'src/infra/api/access-service/patient-type'
import { TestResponseDto } from 'src/infra/api/access-service/test'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { urlResultEditPage } from '../../pages'

export const useColumns = (
  refetch: () => void,
  handlePrint: (row: OmittedSampleResponseDto) => undefined,
  originMap: Map<string, BranchResponseDto>,
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
        getActions: ({ row }) => [
          <GridActionsCellItem
            icon={<PrintIcon />}
            label="In KQ"
            color={row.printedById !== undefined ? 'default' : 'primary'}
            onClick={() => handlePrint(row)}
            disabled={
              !checkPermission(
                userAbility,
                AuthSubject.Sample,
                SampleAction.PrintResult,
                { ...row } as any,
              )
            }
          />,
        ],
      },
      {
        field: 'infoAt',
        headerName: 'Nhận bệnh',
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
        field: 'tests',
        headerName: 'Chỉ định',
        minWidth: 100,
        flex: 1,
        sortable: false,
        valueGetter: ({ row }) => {
          return row.results
            .filter(({ isLocked }) => isLocked)
            .map(({ testId }) => testMap.get(testId)?.name)
            .join(', ')
        },
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
                SampleAction.UpdateInfo,
                { ...row } as any,
              )
            }
          />,
        ],
      },
    ]
  }, [patientTypeMap, testMap, originMap])
  return columns
}
