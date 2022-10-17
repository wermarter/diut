import { Skeleton } from '@mui/material'

import {
  usePatientTypeCreateMutation,
  usePatientTypeDeleteByIdMutation,
  usePatientTypeSearchQuery,
  usePatientTypeUpdateByIdMutation,
  useLazyPatientTypeSearchQuery,
} from 'src/api/patient-type'
import { CrudTable } from 'src/common/components/CrudTable'
import { useCrudPagination } from 'src/common/hooks'
import { patientTypeColumns } from './columns'

export function PatientTypeTable() {
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination()

  const { data, isFetching } = usePatientTypeSearchQuery({
    searchPatientTypeRequestDto: filterObj,
  })
  const [searchPatientTypes] = useLazyPatientTypeSearchQuery()

  const [createPatientType, { isLoading: isCreating }] =
    usePatientTypeCreateMutation()
  const [updatePatientType, { isLoading: isUpdating }] =
    usePatientTypeUpdateByIdMutation()
  const [deletePatientType, { isLoading: isDeleting }] =
    usePatientTypeDeleteByIdMutation()

  return data?.items !== undefined ? (
    <CrudTable
      items={data?.items}
      itemIdField="_id"
      isLoading={isFetching || isCreating || isUpdating || isDeleting}
      fieldColumns={patientTypeColumns}
      rowCount={data?.total!}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onItemCreate={async (item) => {
        await createPatientType({
          createPatientTypeRequestDto: {
            name: item.name,
          },
        }).unwrap()
      }}
      onItemUpdate={async (newItem, oldItem) => {
        await updatePatientType({
          id: newItem._id,
          updatePatientTypeRequestDto: {
            name: newItem.name,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deletePatientType({
          id: item._id,
        }).unwrap()
      }}
      onRefresh={async () => {
        await searchPatientTypes({
          searchPatientTypeRequestDto: filterObj,
        }).unwrap()
      }}
    />
  ) : (
    <Skeleton variant="rounded" width="100%" height="300px" />
  )
}
