import { Skeleton } from '@mui/material'

import {
  useIndicationCreateMutation,
  useIndicationDeleteByIdMutation,
  useIndicationSearchQuery,
  useIndicationUpdateByIdMutation,
  useLazyIndicationSearchQuery,
} from 'src/infra/api/indication'
import { CrudTable } from 'src/components/CrudTable'
import { useCrudPagination } from 'src/shared/hooks'
import { indicationColumns } from './columns'

export function IndicationTable() {
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { index: 1 },
    offset: 0,
  })

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

  return data?.items != undefined ? (
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
            index: item.index,
          },
        }).unwrap()
      }}
      onItemUpdate={async (newItem, oldItem) => {
        await updateIndication({
          id: newItem._id,
          updateIndicationRequestDto: {
            name: newItem.name,
            index: newItem.index,
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
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
