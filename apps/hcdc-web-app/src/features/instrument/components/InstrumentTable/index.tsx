import { useEffect } from 'react'

import {
  useInstrumentCreateMutation,
  useInstrumentDeleteByIdMutation,
  useInstrumentSearchQuery,
  useInstrumentUpdateByIdMutation,
  useLazyInstrumentSearchQuery,
} from 'src/infra/api/access-service/instrument'
import { CrudTable } from 'src/components/table'
import { usePagination } from 'src/shared/hooks'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { instrumentColumns } from './columns'

type InstrumentTableProps = {
  testId: string
}

export function InstrumentTable(props: InstrumentTableProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    usePagination({
      sort: { displayIndex: 1 },
      filter: { testId: props.testId, branchId },
      offset: 0,
    })

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

  useEffect(() => {
    setFilterObj((prev) => ({
      ...prev,
      filter: { ...prev.filter, testId: props.testId },
    }))
  }, [props.testId])

  const { data, isFetching } = useInstrumentSearchQuery(filterObj)
  const [searchInstruments] = useLazyInstrumentSearchQuery()

  const [createInstrument, { isLoading: isCreating }] =
    useInstrumentCreateMutation()
  const [updateInstrument, { isLoading: isUpdating }] =
    useInstrumentUpdateByIdMutation()
  const [deleteInstrument, { isLoading: isDeleting }] =
    useInstrumentDeleteByIdMutation()

  return (
    <CrudTable
      items={data?.items}
      itemIdField="_id"
      isLoading={isFetching || isCreating || isUpdating || isDeleting}
      fieldColumns={instrumentColumns}
      rowCount={data?.total!}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onItemCreate={async (item) => {
        await createInstrument({
          name: item.name,
          displayIndex: item.displayIndex,
          branchId,
          testId: props.testId,
        }).unwrap()
      }}
      onItemUpdate={async (newItem) => {
        await updateInstrument({
          id: newItem._id,
          instrumentUpdateRequestDto: {
            name: newItem.name,
            displayIndex: newItem.displayIndex,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteInstrument(item._id).unwrap()
      }}
      onRefresh={async () => {
        await searchInstruments(filterObj).unwrap()
      }}
    />
  )
}
