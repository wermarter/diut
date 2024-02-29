import {
  useBioProductCreateMutation,
  useBioProductDeleteByIdMutation,
  useBioProductSearchQuery,
  useBioProductUpdateByIdMutation,
  useLazyBioProductSearchQuery,
} from 'src/infra/api/access-service/bio-product'
import { CrudTable } from 'src/components/table'
import { useCrudPagination } from 'src/shared/hooks'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { bioProductColumns } from './columns'

type BioProductTableProps = {
  testId: string
}

export function BioProductTable(props: BioProductTableProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { displayIndex: 1 },
    filter: { testId: props.testId, branchId },
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

  return (
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
          branchId,
          testId: props.testId,
        }).unwrap()
      }}
      onItemUpdate={async (newItem) => {
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
  )
}
