import { useEffect } from 'react'
import { CrudTable } from 'src/components/table'
import { authSlice } from 'src/features/auth'
import {
  useLazyPatientTypeSearchQuery,
  usePatientTypeCreateMutation,
  usePatientTypeDeleteByIdMutation,
  usePatientTypeSearchQuery,
  usePatientTypeUpdateByIdMutation,
} from 'src/infra/api/access-service/patient-type'
import { useTypedSelector } from 'src/infra/redux'
import { usePagination } from 'src/shared/hooks'
import { patientTypeColumns } from './columns'

type PatientTypeTableProps = {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

export function PatientTypeTable(props: PatientTypeTableProps) {
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
      rowCount={data?.total ?? 0}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={props.setPage}
      onPageSizeChange={props.setPageSize}
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
