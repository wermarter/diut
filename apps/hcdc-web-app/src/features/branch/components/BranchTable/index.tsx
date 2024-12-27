import { CrudTable } from 'src/components/table'
import {
  useBranchCreateMutation,
  useBranchSearchQuery,
  useBranchUpdateByIdMutation,
  useLazyBranchSearchQuery,
} from 'src/infra/api/access-service/branch'
import { usePagination } from 'src/shared/hooks'
import { branchColumns } from './columns'

type BranchTableProps = {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

export function BranchTable(props: BranchTableProps) {
  const { filterObj } = usePagination({
    offset: props.page,
    limit: props.pageSize,
    sort: { displayIndex: 1 },
    filter: {},
  })

  const { data, isFetching } = useBranchSearchQuery(filterObj)
  const [searchBranchs] = useLazyBranchSearchQuery()

  const [createBranch, { isLoading: isCreating }] = useBranchCreateMutation()
  const [updateBranch, { isLoading: isUpdating }] =
    useBranchUpdateByIdMutation()

  return (
    <CrudTable
      items={data?.items}
      itemIdField="_id"
      isLoading={isFetching || isCreating || isUpdating}
      fieldColumns={branchColumns}
      rowCount={data?.total ?? 0}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={props.setPage}
      onPageSizeChange={props.setPageSize}
      customRowActions={[
        {
          label: 'Liên kết đơn vị',
          action: (item) => {
            // ui similar to role select
          },
        },
      ]}
      onItemCreate={async (item) => {
        await createBranch({
          type: 'Internal',
          name: item.name,
          displayIndex: item.displayIndex,
          address: item.address,
          sampleOriginIds: [],
        }).unwrap()
      }}
      onItemUpdate={async (newItem) => {
        await updateBranch({
          id: newItem._id,
          branchUpdateRequestDto: {
            name: newItem.name,
            displayIndex: newItem.displayIndex,
            address: newItem.address,
            sampleOriginIds: newItem.sampleOriginIds,
          },
        }).unwrap()
      }}
      onRefresh={async () => {
        await searchBranchs(filterObj).unwrap()
      }}
    />
  )
}
