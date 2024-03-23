import { useNavigate } from 'react-router-dom'
import {
  AuthSubject,
  PatientAction,
  PatientGender,
  checkPermission,
  createAbility,
} from '@diut/hcdc'
import { useMemo } from 'react'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { PatientResponseDto } from 'src/infra/api/access-service/patient'
import { urlPrintSelectPage } from 'src/features/sample-result'

export const useColumns = (
  handleDeleteClick: (patientId: string) => void,
): GridColDef<PatientResponseDto>[] => {
  const navigate = useNavigate()

  const userPermissions = useTypedSelector(
    authSlice.selectors.selectUserPermissions,
  )
  const userAbility = useMemo(() => {
    return createAbility(userPermissions)
  }, [userPermissions])

  const columns: GridColDef<PatientResponseDto>[] = useMemo(() => {
    return [
      {
        field: 'startActions',
        type: 'actions',
        width: 60,
        cellClassName: 'actions',
        getActions: ({ row }) => [
          <GridActionsCellItem
            icon={<ManageSearchIcon />}
            label="Tra cứu"
            color="primary"
            onClick={() => {
              navigate(urlPrintSelectPage({ patientId: row._id }))
            }}
          />,
        ],
      },
      {
        field: 'externalId',
        headerName: 'ID PK',
        sortable: false,
        width: 120,
      },
      {
        field: 'name',
        headerName: 'Họ tên',
        sortable: false,
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'birthYear',
        headerName: 'Năm',
        sortable: false,
        width: 60,
      },
      {
        field: 'gender',
        headerName: 'Giới',
        sortable: false,
        width: 60,
        valueGetter: ({ value }) => {
          if (value === PatientGender.Male) {
            return 'Nam'
          }
          return 'Nữ'
        },
      },
      {
        field: 'address',
        headerName: 'Địa chỉ',
        sortable: false,
        width: 200,
      },
      {
        field: 'phoneNumber',
        headerName: 'SĐT',
        sortable: false,
        width: 150,
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
                AuthSubject.Patient,
                PatientAction.Delete,
                { ...row } as any,
              )
            }
            icon={<DeleteForeverIcon />}
            label="Xoá"
            color="error"
            onClick={() => handleDeleteClick(row._id)}
          />,
        ],
      },
    ]
  }, [userAbility])
  return columns
}
