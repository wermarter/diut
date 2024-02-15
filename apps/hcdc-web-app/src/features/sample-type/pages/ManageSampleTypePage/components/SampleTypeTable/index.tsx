import { Skeleton } from '@mui/material'

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

export function SampleTypeTable() {
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { index: 1 },
    offset: 0,
  })

  const { data, isFetching } = useSampleTypeSearchQuery(filterObj)
  const [searchSampleTypes] = useLazySampleTypeSearchQuery()

  const [createSampleType, { isLoading: isCreating }] =
    useSampleTypeCreateMutation()
  const [updateSampleType, { isLoading: isUpdating }] =
    useSampleTypeUpdateByIdMutation()
  const [deleteSampleType, { isLoading: isDeleting }] =
    useSampleTypeDeleteByIdMutation()

  return data?.items != undefined ? (
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
            index: item.index,
          },
        }).unwrap()
      }}
      onItemUpdate={async (newItem, oldItem) => {
        await updateSampleType({
          id: newItem._id,
          updateSampleTypeRequestDto: {
            name: newItem.name,
            index: newItem.index,
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
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
