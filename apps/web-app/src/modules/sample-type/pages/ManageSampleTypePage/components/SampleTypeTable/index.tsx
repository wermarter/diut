import { Skeleton } from '@mui/material'

import {
  useSampleTypeCreateMutation,
  useSampleTypeDeleteByIdMutation,
  useSampleTypeSearchQuery,
  useSampleTypeUpdateByIdMutation,
  useLazySampleTypeSearchQuery,
} from 'src/api/sample-type'
import { CrudTable } from 'src/common/components/CrudTable'
import { useCrudPagination } from 'src/common/hooks'
import { sampleTypeColumns } from './columns'

export function SampleTypeTable() {
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { leftRightIndex: 1 },
    offset: 0,
  })

  const { data, isFetching } = useSampleTypeSearchQuery({
    searchSampleTypeRequestDto: filterObj,
  })
  const [searchSampleTypes] = useLazySampleTypeSearchQuery()

  const [createSampleType, { isLoading: isCreating }] =
    useSampleTypeCreateMutation()
  const [updateSampleType, { isLoading: isUpdating }] =
    useSampleTypeUpdateByIdMutation()
  const [deleteSampleType, { isLoading: isDeleting }] =
    useSampleTypeDeleteByIdMutation()

  return data?.items !== undefined ? (
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
          createSampleTypeRequestDto: {
            name: item.name,
            leftRightIndex: item.leftRightIndex,
          },
        }).unwrap()
      }}
      onItemUpdate={async (newItem, oldItem) => {
        await updateSampleType({
          id: newItem._id,
          updateSampleTypeRequestDto: {
            name: newItem.name,
            leftRightIndex: newItem.leftRightIndex,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteSampleType({
          id: item._id,
        }).unwrap()
      }}
      onRefresh={async () => {
        await searchSampleTypes({
          searchSampleTypeRequestDto: filterObj,
        }).unwrap()
      }}
    />
  ) : (
    <Skeleton variant="rounded" width="100%" height="400px" />
  )
}
