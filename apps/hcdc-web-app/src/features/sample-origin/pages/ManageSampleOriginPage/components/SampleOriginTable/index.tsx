import { Skeleton } from '@mui/material'

import {
  useSampleOriginCreateMutation,
  useSampleOriginDeleteByIdMutation,
  useSampleOriginSearchQuery,
  useSampleOriginUpdateByIdMutation,
  useLazySampleOriginSearchQuery,
} from 'src/infra/api/sample-origin'
import { CrudTable } from 'src/components/CrudTable'
import { useCrudPagination } from 'src/shared/hooks'
import { sampleOriginColumns } from './columns'

export function SampleOriginTable() {
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { index: 1 },
    offset: 0,
  })

  const { data, isFetching } = useSampleOriginSearchQuery({
    searchSampleOriginRequestDto: filterObj,
  })
  const [searchSampleOrigins] = useLazySampleOriginSearchQuery()

  const [createSampleOrigin, { isLoading: isCreating }] =
    useSampleOriginCreateMutation()
  const [updateSampleOrigin, { isLoading: isUpdating }] =
    useSampleOriginUpdateByIdMutation()
  const [deleteSampleOrigin, { isLoading: isDeleting }] =
    useSampleOriginDeleteByIdMutation()

  return data?.items != undefined ? (
    <CrudTable
      items={data?.items}
      itemIdField="_id"
      isLoading={isFetching || isCreating || isUpdating || isDeleting}
      fieldColumns={sampleOriginColumns}
      rowCount={data?.total!}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onItemCreate={async (item) => {
        await createSampleOrigin({
          createSampleOriginRequestDto: {
            name: item.name,
            index: item.index,
          },
        }).unwrap()
      }}
      onItemUpdate={async (newItem, oldItem) => {
        await updateSampleOrigin({
          id: newItem._id,
          updateSampleOriginRequestDto: {
            name: newItem.name,
            index: newItem.index,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteSampleOrigin({
          id: item._id,
        }).unwrap()
      }}
      onRefresh={async () => {
        await searchSampleOrigins({
          searchSampleOriginRequestDto: filterObj,
        }).unwrap()
      }}
    />
  ) : (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
