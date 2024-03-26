import { GridColDef } from '@mui/x-data-grid'
import { Typography } from '@mui/material'
import { PatientGender } from '@diut/hcdc'
import { format } from 'date-fns'
import { DATETIME_FORMAT } from '@diut/common'

import { PatientTypeResponseDto } from 'src/infra/api/access-service/patient-type'
import {
  OmittedSampleResponseDto,
  ReportQuerySoNhanMauSummaryResponseDto,
} from 'src/infra/api/access-service/report'
import { TestResponseDto } from 'src/infra/api/access-service/test'

export const useColumns = (props: {
  summary: ReportQuerySoNhanMauSummaryResponseDto | undefined
  patientTypeMap: Map<string, PatientTypeResponseDto>
  tests: TestResponseDto[]
  categories: {
    groupId: string
    children: {
      field: string
    }[]
  }[]
}): GridColDef<OmittedSampleResponseDto>[] => {
  return [
    {
      field: 'infoAt',
      headerName: 'Ngày nhận',
      width: 100,
      sortable: false,
      valueGetter: ({ value }) => {
        if (value === undefined) {
          return ''
        }
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
      width: 150,
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
        // @ts-ignore
        if (row?.isSummary === true) {
          return ''
        }
        if (row.patient?.gender === PatientGender.Male) {
          return 'Nam'
        } else {
          return 'Nữ'
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
      field: 'phoneNumber',
      headerName: 'SĐT',
      width: 120,
      sortable: false,
      valueGetter: ({ row }) => row.patient?.phoneNumber,
    },
    {
      field: 'patientType',
      headerName: 'Đối tượng',
      width: 90,
      sortable: false,
      valueGetter: ({ row }) =>
        props.patientTypeMap.get(row.patientTypeId)?.name,
    },
    ...props.tests.map(
      ({ _id, name }): GridColDef<OmittedSampleResponseDto> => ({
        field: _id,
        headerName: name,
        width: 80,
        sortable: false,
        align: 'center',
        renderCell: ({ value }) => (
          <Typography fontWeight="bold">{value}</Typography>
        ),
        valueGetter: ({ row }) => {
          // @ts-ignore
          if (row?.isSummary === true) {
            // @ts-ignore
            const count = props.summary?.test?.[_id]
            if (count > 0) {
              return count
            }

            return ''
          }

          const { testId } =
            row.results.find(({ testId }) => testId === _id) ?? {}
          if (testId != undefined) {
            return '✓'
          }

          return ''
        },
      }),
    ),
    {
      field: 'isTraBuuDien',
      headerName: 'Bưu điện',
      width: 80,
      sortable: false,
      editable: true,
      align: 'center',
      renderCell: ({ value }) => (
        <Typography fontWeight="bold">{value}</Typography>
      ),
      valueGetter: ({ value, row }) => {
        //@ts-ignore
        if (row?.isSummary === true) {
          const count = props.summary?.isTraBuuDien!
          if (count > 0) {
            return count
          }

          return ''
        }

        if (value === true) {
          return '✓'
        }
        return ''
      },
    },
    {
      field: 'isNgoaiGio',
      headerName: 'TG',
      width: 90,
      sortable: false,
      editable: true,
      renderCell: ({ value, row }) => {
        //@ts-ignore
        if (row?.isSummary === true) {
          return <Typography fontWeight="bold">{value}</Typography>
        }

        return value
      },
      valueGetter: ({ value, row }) => {
        //@ts-ignore
        if (row?.isSummary === true) {
          const count = props.summary?.isNgoaiGio!
          if (count > 0) {
            return count
          }

          return ''
        }

        if (value === true) {
          return 'Ngoài giờ'
        } else if (value === false) {
          return 'Trong giờ'
        }
        return ''
      },
    },
  ]
}
