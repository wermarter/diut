import { Skeleton } from '@mui/material'

import {
  useTestCreateMutation,
  useTestDeleteByIdMutation,
  useTestSearchQuery,
  useTestUpdateByIdMutation,
  useLazyTestSearchQuery,
} from 'src/api/test'
import { useTestCategorySearchQuery } from 'src/api/test-category'
import { CrudTable } from 'src/common/components/CrudTable'
import { useCrudPagination } from 'src/common/hooks'
import { useTestColumns } from './columns'

export function TestTable() {
  const { data: categoryRes, isFetching: isLoadingTestCategories } =
    useTestCategorySearchQuery({
      searchTestCategoryRequestDto: {
        sort: { leftRightIndex: 1 },
      },
    })

  const testCategories = categoryRes?.items ?? []
  const columns = useTestColumns(testCategories)

  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination()

  const { data, isFetching } = useTestSearchQuery({
    searchTestRequestDto: filterObj,
  })
  const [searchTests] = useLazyTestSearchQuery()

  const [createTest, { isLoading: isCreating }] = useTestCreateMutation()
  const [updateTest, { isLoading: isUpdating }] = useTestUpdateByIdMutation()
  const [deleteTest, { isLoading: isDeleting }] = useTestDeleteByIdMutation()

  return data?.items !== undefined && !isLoadingTestCategories ? (
    <CrudTable
      items={data?.items}
      itemIdField="_id"
      isLoading={isFetching || isCreating || isUpdating || isDeleting}
      fieldColumns={columns}
      rowCount={data?.total!}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onItemCreate={async (item) => {
        await createTest({
          createTestRequestDto: {
            name: item.name,
            topBottomIndex: item.topBottomIndex,
            category: testCategories.find(
              (category) => category.name === (item.category as any)
            )?._id!,
          },
        }).unwrap()
      }}
      onItemUpdate={async (newItem, oldItem) => {
        await updateTest({
          id: newItem._id,
          updateTestRequestDto: {
            name: newItem.name,
            topBottomIndex: newItem.topBottomIndex,
            category: testCategories.find(
              (category) => category.name === (newItem.category as any)
            )?._id,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteTest({
          id: item._id,
        }).unwrap()
      }}
      onRefresh={async () => {
        await searchTests({
          searchTestRequestDto: filterObj,
        }).unwrap()
      }}
    />
  ) : (
    <Skeleton variant="rounded" width="100%" height="400px" />
  )
}
