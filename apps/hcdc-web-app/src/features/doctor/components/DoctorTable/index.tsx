import { Skeleton } from '@mui/material'

import {
  useDoctorCreateMutation,
  useDoctorDeleteByIdMutation,
  useDoctorSearchQuery,
  useDoctorUpdateByIdMutation,
  useLazyDoctorSearchQuery,
} from 'src/infra/api/access-service/doctor'
import { CrudTable } from 'src/components/table'
import { useCrudPagination } from 'src/shared/hooks'
import { doctorColumns } from './columns'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'

export function DoctorTable() {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { displayIndex: 1 },
    filter: { branchId },
    offset: 0,
  })

  const { data, isFetching } = useDoctorSearchQuery(filterObj)
  const [searchDoctors] = useLazyDoctorSearchQuery()

  const [createDoctor, { isLoading: isCreating }] = useDoctorCreateMutation()
  const [updateDoctor, { isLoading: isUpdating }] =
    useDoctorUpdateByIdMutation()
  const [deleteDoctor, { isLoading: isDeleting }] =
    useDoctorDeleteByIdMutation()

  return data?.items != undefined ? (
    <CrudTable
      items={data?.items}
      itemIdField="_id"
      isLoading={isFetching || isCreating || isUpdating || isDeleting}
      fieldColumns={doctorColumns}
      rowCount={data?.total!}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onItemCreate={async (item) => {
        await createDoctor({
          name: item.name,
          displayIndex: item.displayIndex,
          branchId,
        }).unwrap()
      }}
      onItemUpdate={async (newItem) => {
        await updateDoctor({
          id: newItem._id,
          doctorUpdateRequestDto: {
            name: newItem.name,
            displayIndex: newItem.displayIndex,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteDoctor(item._id).unwrap()
      }}
      onRefresh={async () => {
        await searchDoctors(filterObj).unwrap()
      }}
    />
  ) : (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
