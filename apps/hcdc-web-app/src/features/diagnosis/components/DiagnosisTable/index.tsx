import { useEffect } from 'react'

import {
  useDiagnosisCreateMutation,
  useDiagnosisDeleteByIdMutation,
  useDiagnosisSearchQuery,
  useDiagnosisUpdateByIdMutation,
  useLazyDiagnosisSearchQuery,
} from 'src/infra/api/access-service/diagnosis'
import { CrudTable } from 'src/components/table'
import { useCrudPagination } from 'src/shared/hooks'
import { diagnosisColumns } from './columns'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'

type DiagnosisTableProps = {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

export function DiagnosisTable(props: DiagnosisTableProps) {
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

  const { data, isFetching } = useDiagnosisSearchQuery(filterObj)
  const [searchDiagnosiss] = useLazyDiagnosisSearchQuery()

  const [createDiagnosis, { isLoading: isCreating }] =
    useDiagnosisCreateMutation()
  const [updateDiagnosis, { isLoading: isUpdating }] =
    useDiagnosisUpdateByIdMutation()
  const [deleteDiagnosis, { isLoading: isDeleting }] =
    useDiagnosisDeleteByIdMutation()

  return (
    <CrudTable
      items={data?.items}
      itemIdField="_id"
      isLoading={isFetching || isCreating || isUpdating || isDeleting}
      fieldColumns={diagnosisColumns}
      rowCount={data?.total!}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onItemCreate={async (item) => {
        await createDiagnosis({
          name: item.name,
          displayIndex: item.displayIndex,
          branchId,
        }).unwrap()
      }}
      onItemUpdate={async (newItem) => {
        await updateDiagnosis({
          id: newItem._id,
          diagnosisUpdateRequestDto: {
            name: newItem.name,
            displayIndex: newItem.displayIndex,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteDiagnosis(item._id).unwrap()
      }}
      onRefresh={async () => {
        await searchDiagnosiss(filterObj).unwrap()
      }}
    />
  )
}
