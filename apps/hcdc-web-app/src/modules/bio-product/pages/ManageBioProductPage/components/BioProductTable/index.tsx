import { Skeleton } from '@mui/material'

import {
  useBioProductCreateMutation,
  useBioProductDeleteByIdMutation,
  useBioProductSearchQuery,
  useBioProductUpdateByIdMutation,
  useLazyBioProductSearchQuery,
} from 'src/api/bio-product'
import { CrudTable } from 'src/common/components/CrudTable'
import { useCrudPagination } from 'src/common/hooks'
import { bioProductColumns } from './columns'

export function BioProductTable() {
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { index: 1 },
    offset: 0,
  })

  const { data, isFetching } = useBioProductSearchQuery({
    searchBioProductRequestDto: filterObj,
  })
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
          createBioProductRequestDto: {
            name: item.name,
            index: item.index,
          },
        }).unwrap()
      }}
      onItemUpdate={async (newItem, oldItem) => {
        await updateBioProduct({
          id: newItem._id,
          updateBioProductRequestDto: {
            name: newItem.name,
            index: newItem.index,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteBioProduct({
          id: item._id,
        }).unwrap()
      }}
      onRefresh={async () => {
        await searchBioProducts({
          searchBioProductRequestDto: filterObj,
        }).unwrap()
      }}
    />
  ) : (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
