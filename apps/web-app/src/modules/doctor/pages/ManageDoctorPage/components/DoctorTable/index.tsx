import { Skeleton } from '@mui/material'

import {
  useDoctorCreateMutation,
  useDoctorDeleteByIdMutation,
  useDoctorSearchQuery,
  useDoctorUpdateByIdMutation,
  useLazyDoctorSearchQuery,
} from 'src/api/doctor'
import { CrudTable } from 'src/common/components/CrudTable'
import { useCrudPagination } from 'src/common/hooks'
import { doctorColumns } from './columns'

export function DoctorTable() {
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { index: 1 },
    offset: 0,
  })

  const { data, isFetching } = useDoctorSearchQuery({
    searchDoctorRequestDto: filterObj,
  })
  const [searchDoctors] = useLazyDoctorSearchQuery()

  const [createDoctor, { isLoading: isCreating }] = useDoctorCreateMutation()
  const [updateDoctor, { isLoading: isUpdating }] =
    useDoctorUpdateByIdMutation()
  const [deleteDoctor, { isLoading: isDeleting }] =
    useDoctorDeleteByIdMutation()

  return data?.items !== undefined ? (
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
          createDoctorRequestDto: {
            name: item.name,
            index: item.index,
          },
        }).unwrap()
      }}
      onItemUpdate={async (newItem, oldItem) => {
        await updateDoctor({
          id: newItem._id,
          updateDoctorRequestDto: {
            name: newItem.name,
            index: newItem.index,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteDoctor({
          id: item._id,
        }).unwrap()
      }}
      onRefresh={async () => {
        await searchDoctors({ searchDoctorRequestDto: filterObj }).unwrap()
      }}
    />
  ) : (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
