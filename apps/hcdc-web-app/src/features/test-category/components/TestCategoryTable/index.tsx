import { Skeleton } from '@mui/material'

import {
  useTestCategoryCreateMutation,
  useTestCategoryDeleteByIdMutation,
  useTestCategorySearchQuery,
  useTestCategoryUpdateByIdMutation,
  useLazyTestCategorySearchQuery,
} from 'src/infra/api/access-service/test-category'
import { CrudTable } from 'src/components/table'
import { useCrudPagination } from 'src/shared/hooks'
import { testCategoryColumns } from './columns'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'

export function TestCategoryTable() {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { displayIndex: 1 },
    offset: 0,
  })

  const { data, isFetching } = useTestCategorySearchQuery(filterObj)
  const [searchTestCategorys] = useLazyTestCategorySearchQuery()

  const [createTestCategory, { isLoading: isCreating }] =
    useTestCategoryCreateMutation()
  const [updateTestCategory, { isLoading: isUpdating }] =
    useTestCategoryUpdateByIdMutation()
  const [deleteTestCategory, { isLoading: isDeleting }] =
    useTestCategoryDeleteByIdMutation()

  return data?.items != undefined ? (
    <CrudTable
      items={data?.items}
      itemIdField="_id"
      isLoading={isFetching || isCreating || isUpdating || isDeleting}
      fieldColumns={testCategoryColumns}
      rowCount={data?.total!}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onItemCreate={async (item) => {
        await createTestCategory({
          name: item.name,
          displayIndex: item.displayIndex,
          reportIndex: item.reportIndex,
          branchId,
        }).unwrap()
      }}
      onItemUpdate={async (newItem) => {
        await updateTestCategory({
          id: newItem._id,
          testCategoryUpdateRequestDto: {
            name: newItem.name,
            displayIndex: newItem.displayIndex,
            reportIndex: newItem.reportIndex,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteTestCategory(item._id).unwrap()
      }}
      onRefresh={async () => {
        await searchTestCategorys(filterObj).unwrap()
      }}
    />
  ) : (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
