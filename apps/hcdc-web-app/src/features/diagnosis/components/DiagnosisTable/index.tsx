import { Skeleton } from '@mui/material'

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

export function DiagnosisTable() {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { displayIndex: 1 },
    offset: 0,
  })

  const { data, isFetching } = useDiagnosisSearchQuery(filterObj)
  const [searchDiagnosiss] = useLazyDiagnosisSearchQuery()

  const [createDiagnosis, { isLoading: isCreating }] =
    useDiagnosisCreateMutation()
  const [updateDiagnosis, { isLoading: isUpdating }] =
    useDiagnosisUpdateByIdMutation()
  const [deleteDiagnosis, { isLoading: isDeleting }] =
    useDiagnosisDeleteByIdMutation()

  return data?.items != undefined ? (
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
  ) : (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
