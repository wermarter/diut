import {
  useDoctorCreateMutation,
  useDoctorDeleteByIdMutation,
  useDoctorSearchQuery,
  useDoctorUpdateByIdMutation,
  useLazyDoctorSearchQuery,
} from 'src/api/doctor'
import { CrudTable } from 'src/common/components/CrudTable'
import { doctorColumns } from './columns'

export function DoctorTable() {
  const { data, isFetching } = useDoctorSearchQuery({
    searchDoctorRequestDto: { sort: { createdAt: -1 } },
  })
  const [searchDoctors, { isFetching: isSearching }] =
    useLazyDoctorSearchQuery()

  const [createDoctor, { isLoading: isCreating }] = useDoctorCreateMutation()
  const [updateDoctor, { isLoading: isUpdating }] =
    useDoctorUpdateByIdMutation()
  const [deleteDoctor, { isLoading: isDeleting }] =
    useDoctorDeleteByIdMutation()

  return (
    <CrudTable
      items={data?.items ?? []}
      itemIdField="_id"
      isLoading={
        isFetching || isCreating || isUpdating || isDeleting || isSearching
      }
      fieldColumns={doctorColumns}
      onItemCreate={async (item) => {
        await createDoctor({
          createDoctorRequestDto: {
            name: item.name,
          },
        })
      }}
      onItemUpdate={async (newItem, oldItem) => {
        await updateDoctor({
          id: newItem._id,
          updateDoctorRequestDto: {
            name: newItem.name,
          },
        })
      }}
      onItemDelete={async (item) => {
        await deleteDoctor({
          id: item._id,
        })
      }}
      onRefresh={async () => {
        await searchDoctors({
          searchDoctorRequestDto: { sort: { createdAt: -1 } },
        })
      }}
    />
  )
}
