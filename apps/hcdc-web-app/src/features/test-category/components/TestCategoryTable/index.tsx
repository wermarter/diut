import { useEffect } from 'react'

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

type TestCategoryTableProps = {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

export function TestCategoryTable(props: TestCategoryTableProps) {
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

  const { data, isFetching } = useTestCategorySearchQuery(filterObj)
  const [searchTestCategorys] = useLazyTestCategorySearchQuery()

  const [createTestCategory, { isLoading: isCreating }] =
    useTestCategoryCreateMutation()
  const [updateTestCategory, { isLoading: isUpdating }] =
    useTestCategoryUpdateByIdMutation()
  const [deleteTestCategory, { isLoading: isDeleting }] =
    useTestCategoryDeleteByIdMutation()

  return (
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
  )
}
