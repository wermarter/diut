import { PrintTemplate } from '@diut/hcdc'

import {
  usePrintFormSearchQuery,
  usePrintFormUpdateByIdMutation,
  useLazyPrintFormSearchQuery,
  usePrintFormCreateMutation,
  usePrintFormDeleteByIdMutation,
} from 'src/infra/api/access-service/print-form'
import { CrudTable } from 'src/components/table'
import { useCrudPagination } from 'src/shared/hooks'
import { printFormColumns } from './columns'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'

export function PrintFormTable() {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { filterObj, onPageChange, onPageSizeChange } = useCrudPagination({
    sort: { displayIndex: 1 },
    filter: { branchId },
    offset: 0,
  })

  const { data, isFetching } = usePrintFormSearchQuery(filterObj)
  const [searchPrintForms] = useLazyPrintFormSearchQuery()

  const [updatePrintForm, { isLoading: isUpdating }] =
    usePrintFormUpdateByIdMutation()
  const [createPrintForm, { isLoading: isCreating }] =
    usePrintFormCreateMutation()
  const [deletePrintForm, { isLoading: isDeleting }] =
    usePrintFormDeleteByIdMutation()

  return (
    <CrudTable
      items={data?.items}
      itemIdField="_id"
      isLoading={isFetching || isCreating || isUpdating || isDeleting}
      fieldColumns={printFormColumns}
      rowCount={data?.total!}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onItemCreate={async (item) => {
        await createPrintForm({
          name: item.name,
          displayIndex: item.displayIndex,
          isAuthorLocked: item.isAuthorLocked,
          authorTitle: item.authorTitle,
          authorName: item.authorName,
          titleMargin: item.titleMargin,
          isA4: true,
          template: PrintTemplate.FormChung,
          branchId,
        }).unwrap()
      }}
      onItemUpdate={async (newItem) => {
        await updatePrintForm({
          id: newItem._id,
          printFormUpdateRequestDto: {
            name: newItem.name,
            displayIndex: newItem.displayIndex,
            isAuthorLocked: newItem.isAuthorLocked,
            authorTitle: newItem.authorTitle,
            authorName: newItem.authorName,
            titleMargin: newItem.titleMargin,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deletePrintForm(item._id).unwrap()
      }}
      onRefresh={async () => {
        await searchPrintForms(filterObj).unwrap()
      }}
    />
  )
}
