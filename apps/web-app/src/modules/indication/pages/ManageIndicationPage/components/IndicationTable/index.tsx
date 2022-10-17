import { Skeleton } from '@mui/material'

import {
  useIndicationCreateMutation,
  useIndicationDeleteByIdMutation,
  useIndicationSearchQuery,
  useIndicationUpdateByIdMutation,
  useLazyIndicationSearchQuery,
} from 'src/api/indication'
import { CrudTable } from 'src/common/components/CrudTable'
import { useCrudPagination } from 'src/common/hooks'
import { indicationColumns } from './columns'

export function IndicationTable() {
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination()

  const { data, isFetching } = useIndicationSearchQuery({
    searchIndicationRequestDto: filterObj,
  })
  const [searchIndications] = useLazyIndicationSearchQuery()

  const [createIndication, { isLoading: isCreating }] =
    useIndicationCreateMutation()
  const [updateIndication, { isLoading: isUpdating }] =
    useIndicationUpdateByIdMutation()
  const [deleteIndication, { isLoading: isDeleting }] =
    useIndicationDeleteByIdMutation()

  return data?.items !== undefined ? (
    <CrudTable
      items={data?.items}
      itemIdField="_id"
      isLoading={isFetching || isCreating || isUpdating || isDeleting}
      fieldColumns={indicationColumns}
      rowCount={data?.total!}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onItemCreate={async (item) => {
        await createIndication({
          createIndicationRequestDto: {
            name: item.name,
          },
        }).unwrap()
      }}
      onItemUpdate={async (newItem, oldItem) => {
        await updateIndication({
          id: newItem._id,
          updateIndicationRequestDto: {
            name: newItem.name,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteIndication({
          id: item._id,
        }).unwrap()
      }}
      onRefresh={async () => {
        await searchIndications({
          searchIndicationRequestDto: filterObj,
        }).unwrap()
      }}
    />
  ) : (
    <Skeleton variant="rounded" width="100%" height="400px" />
  )
}
