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

export function TestCategoryTable() {
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { index: 1 },
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
          createTestCategoryRequestDto: {
            name: item.name,
            index: item.index,
            reportIndex: item.reportIndex,
          },
        }).unwrap()
      }}
      onItemUpdate={async (newItem, oldItem) => {
        await updateTestCategory({
          id: newItem._id,
          updateTestCategoryRequestDto: {
            name: newItem.name,
            index: newItem.index,
            reportIndex: newItem.reportIndex,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteTestCategory({
          id: item._id,
        }).unwrap()
      }}
      onRefresh={async () => {
        await searchTestCategorys({
          searchTestCategoryRequestDto: filterObj,
        }).unwrap()
      }}
    />
  ) : (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
