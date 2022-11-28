import { Skeleton } from '@mui/material'

import {
  useTestCategoryCreateMutation,
  useTestCategoryDeleteByIdMutation,
  useTestCategorySearchQuery,
  useTestCategoryUpdateByIdMutation,
  useLazyTestCategorySearchQuery,
} from 'src/api/test-category'
import { CrudTable } from 'src/common/components/CrudTable'
import { useCrudPagination } from 'src/common/hooks'
import { testCategoryColumns } from './columns'

export function TestCategoryTable() {
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { index: 1 },
    offset: 0,
  })

  const { data, isFetching } = useTestCategorySearchQuery({
    searchTestCategoryRequestDto: filterObj,
  })
  const [searchTestCategorys] = useLazyTestCategorySearchQuery()

  const [createTestCategory, { isLoading: isCreating }] =
    useTestCategoryCreateMutation()
  const [updateTestCategory, { isLoading: isUpdating }] =
    useTestCategoryUpdateByIdMutation()
  const [deleteTestCategory, { isLoading: isDeleting }] =
    useTestCategoryDeleteByIdMutation()

  return data?.items !== undefined ? (
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
          },
        }).unwrap()
      }}
      onItemUpdate={async (newItem, oldItem) => {
        await updateTestCategory({
          id: newItem._id,
          updateTestCategoryRequestDto: {
            name: newItem.name,
            index: newItem.index,
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
