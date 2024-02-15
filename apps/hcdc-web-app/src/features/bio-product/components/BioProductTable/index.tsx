import { Skeleton } from '@mui/material'

import {
  useBioProductCreateMutation,
  useBioProductDeleteByIdMutation,
  useBioProductSearchQuery,
  useBioProductUpdateByIdMutation,
  useLazyBioProductSearchQuery,
} from 'src/infra/api/access-service/bio-product'
import { CrudTable } from 'src/components/table'
import { useCrudPagination } from 'src/shared/hooks'
import { bioProductColumns } from './columns'

export function BioProductTable() {
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { index: 1 },
    offset: 0,
  })

  const { data, isFetching } = useBioProductSearchQuery(filterObj)
  const [searchBioProducts] = useLazyBioProductSearchQuery()

  const [createBioProduct, { isLoading: isCreating }] =
    useBioProductCreateMutation()
  const [updateBioProduct, { isLoading: isUpdating }] =
    useBioProductUpdateByIdMutation()
  const [deleteBioProduct, { isLoading: isDeleting }] =
    useBioProductDeleteByIdMutation()

  return data?.items != undefined ? (
    <CrudTable
      items={data?.items}
      itemIdField="_id"
      isLoading={isFetching || isCreating || isUpdating || isDeleting}
      fieldColumns={bioProductColumns}
      rowCount={data?.total!}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onItemCreate={async (item) => {
        await createBioProduct({
          name: item.name,
          displayIndex: item.displayIndex,
        }).unwrap()
      }}
      onItemUpdate={async (newItem, oldItem) => {
        await updateBioProduct({
          id: newItem._id,
          bioProductUpdateRequestDto: {
            name: newItem.name,
            displayIndex: newItem.displayIndex,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteBioProduct(item._id).unwrap()
      }}
      onRefresh={async () => {
        await searchBioProducts(filterObj).unwrap()
      }}
    />
  ) : (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
