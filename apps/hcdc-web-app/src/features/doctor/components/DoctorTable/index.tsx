import { useEffect } from 'react'

import { CrudTable } from 'src/components/table'
import { authSlice } from 'src/features/auth'
import {
  useDoctorCreateMutation,
  useDoctorDeleteByIdMutation,
  useDoctorSearchQuery,
  useDoctorUpdateByIdMutation,
  useLazyDoctorSearchQuery,
} from 'src/infra/api/access-service/doctor'
import { useTypedSelector } from 'src/infra/redux'
import { usePagination } from 'src/shared/hooks'
import { doctorColumns } from './columns'

type DoctorTableProps = {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

export function DoctorTable(props: DoctorTableProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { filterObj, setFilterObj } = usePagination({
    offset: props.page,
    limit: props.pageSize,
    sort: { displayIndex: 1 },
    filter: { branchId },
  })

  useEffect(() => {
    if (branchId) {
      setFilterObj((prev) => ({
        ...prev,
        filter: {
          ...filterObj.filter,
          branchId,
        },
      }))
    }
  }, [branchId])

  const { data, isFetching } = useDoctorSearchQuery(filterObj)
  const [searchDoctors] = useLazyDoctorSearchQuery()

  const [createDoctor, { isLoading: isCreating }] = useDoctorCreateMutation()
  const [updateDoctor, { isLoading: isUpdating }] =
    useDoctorUpdateByIdMutation()
  const [deleteDoctor, { isLoading: isDeleting }] =
    useDoctorDeleteByIdMutation()

  return (
    <CrudTable
      items={data?.items}
      itemIdField="_id"
      isLoading={isFetching || isCreating || isUpdating || isDeleting}
      fieldColumns={doctorColumns}
      rowCount={data?.total ?? 0}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={props.setPage}
      onPageSizeChange={props.setPageSize}
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
  )
}
