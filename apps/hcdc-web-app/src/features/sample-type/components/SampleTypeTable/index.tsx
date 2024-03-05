import { useEffect } from 'react'

import {
  useSampleTypeCreateMutation,
  useSampleTypeDeleteByIdMutation,
  useSampleTypeSearchQuery,
  useSampleTypeUpdateByIdMutation,
  useLazySampleTypeSearchQuery,
} from 'src/infra/api/access-service/sample-type'
import { CrudTable } from 'src/components/table'
import { useCrudPagination } from 'src/shared/hooks'
import { sampleTypeColumns } from './columns'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'

type SampleTypeTableProps = {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

export function SampleTypeTable(props: SampleTypeTableProps) {
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

  const { data, isFetching } = useSampleTypeSearchQuery(filterObj)
  const [searchSampleTypes] = useLazySampleTypeSearchQuery()

  const [createSampleType, { isLoading: isCreating }] =
    useSampleTypeCreateMutation()
  const [updateSampleType, { isLoading: isUpdating }] =
    useSampleTypeUpdateByIdMutation()
  const [deleteSampleType, { isLoading: isDeleting }] =
    useSampleTypeDeleteByIdMutation()

  return (
    <CrudTable
      items={data?.items}
      itemIdField="_id"
      isLoading={isFetching || isCreating || isUpdating || isDeleting}
      fieldColumns={sampleTypeColumns}
      rowCount={data?.total!}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onItemCreate={async (item) => {
        await createSampleType({
          name: item.name,
          displayIndex: item.displayIndex,
          branchId,
        }).unwrap()
      }}
      onItemUpdate={async (newItem) => {
        await updateSampleType({
          id: newItem._id,
          sampleTypeUpdateRequestDto: {
            name: newItem.name,
            displayIndex: newItem.displayIndex,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteSampleType(item._id).unwrap()
      }}
      onRefresh={async () => {
        await searchSampleTypes(filterObj).unwrap()
      }}
    />
  )
}
