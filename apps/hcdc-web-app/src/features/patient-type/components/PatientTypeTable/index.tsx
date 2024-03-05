import { useEffect } from 'react'

import {
  usePatientTypeCreateMutation,
  usePatientTypeDeleteByIdMutation,
  usePatientTypeSearchQuery,
  usePatientTypeUpdateByIdMutation,
  useLazyPatientTypeSearchQuery,
} from 'src/infra/api/access-service/patient-type'
import { CrudTable } from 'src/components/table'
import { useCrudPagination } from 'src/shared/hooks'
import { patientTypeColumns } from './columns'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'

type PatientTypeTableProps = {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

export function PatientTypeTable(props: PatientTypeTableProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    useCrudPagination(
      {
        offset: props.page,
        limit: props.pageSize,
        sort: { displayIndex: 1 },
        filter: { branchId },
      },
      props.setPage,
      props.setPageSize,
    )

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

  const { data, isFetching } = usePatientTypeSearchQuery(filterObj)
  const [searchPatientTypes] = useLazyPatientTypeSearchQuery()

  const [createPatientType, { isLoading: isCreating }] =
    usePatientTypeCreateMutation()
  const [updatePatientType, { isLoading: isUpdating }] =
    usePatientTypeUpdateByIdMutation()
  const [deletePatientType, { isLoading: isDeleting }] =
    usePatientTypeDeleteByIdMutation()

  return (
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
          name: item.name,
          displayIndex: item.displayIndex,
          branchId,
        }).unwrap()
      }}
      onItemUpdate={async (newItem) => {
        await updatePatientType({
          id: newItem._id,
          patientTypeUpdateRequestDto: {
            name: newItem.name,
            displayIndex: newItem.displayIndex,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deletePatientType(item._id).unwrap()
      }}
      onRefresh={async () => {
        await searchPatientTypes(filterObj).unwrap()
      }}
    />
  )
}
