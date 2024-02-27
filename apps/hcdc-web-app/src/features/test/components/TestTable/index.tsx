import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from '@mui/material'
import { useLoaderData } from 'react-router-dom'

import {
  useTestCreateMutation,
  useTestDeleteByIdMutation,
  useTestSearchQuery,
  useTestUpdateByIdMutation,
  useLazyTestSearchQuery,
} from 'src/infra/api/access-service/test'
import { CrudTable } from 'src/components/table'
import { useCrudPagination } from 'src/shared/hooks'
import { manageTestPageLoader } from '../../pages/ManageTestPage/loader'
import { useTestColumns } from './columns'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'

const ALL_CATEGORIES = 'ALL_CATEGORIES'

export function TestTable() {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { testCategories, bioProducts, printForms } =
    useLoaderData() as Awaited<ReturnType<typeof manageTestPageLoader>>

  const columns = useTestColumns(testCategories, bioProducts, printForms)

  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    useCrudPagination({
      sort: { index: 1 },
      offset: 0,
    })

  const { data, isFetching } = useTestSearchQuery(filterObj)
  const [searchTests] = useLazyTestSearchQuery()

  const [createTest, { isLoading: isCreating }] = useTestCreateMutation()
  const [updateTest, { isLoading: isUpdating }] = useTestUpdateByIdMutation()
  const [deleteTest, { isLoading: isDeleting }] = useTestDeleteByIdMutation()

  return data?.items != undefined ? (
    <CrudTable
      items={data?.items}
      itemIdField="_id"
      isLoading={isFetching || isCreating || isUpdating || isDeleting}
      fieldColumns={columns}
      rowCount={data?.total!}
      page={data?.offset!}
      pageSize={data?.limit!}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onItemCreate={async (item) => {
        await createTest({
          name: item.name,
          displayIndex: item.displayIndex,
          testCategoryId: item.testCategoryId,
          bioProductId: item.bioProductId,
          printFormId: item.printFormId,
          shouldDisplayWithChildren: item.shouldDisplayWithChildren ?? false,
          branchId,
        }).unwrap()
      }}
      onItemUpdate={async (newItem) => {
        await updateTest({
          id: newItem._id,
          testUpdateRequestDto: {
            name: newItem.name,
            displayIndex: newItem.displayIndex,
            testCategoryId: newItem.testCategoryId,
            bioProductId: newItem.bioProductId,
            printFormId: newItem.printFormId,
            shouldDisplayWithChildren: newItem.shouldDisplayWithChildren,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteTest(item._id).unwrap()
      }}
      onRefresh={async () => {
        await searchTests(filterObj).unwrap()
      }}
      TopRightComponent={
        <FormControl fullWidth size="small" sx={{ minWidth: '300px' }}>
          <InputLabel>Nhóm xét nghiệm</InputLabel>
          <Select
            label="Nhóm xét nghiệm"
            defaultValue={ALL_CATEGORIES}
            onChange={({ target }) => {
              const categoryId = target?.value
              if (categoryId !== ALL_CATEGORIES) {
                setFilterObj((filterObj) => ({
                  ...filterObj,
                  offset: 0,
                  filter: {
                    ...filterObj.filter,
                    testCategoryId: categoryId,
                  },
                }))
              } else {
                setFilterObj((filterObj) => ({
                  ...filterObj,
                  offset: 0,
                  filter: {
                    ...filterObj.filter,
                    testCategoryId: undefined,
                  },
                }))
              }
            }}
          >
            <MenuItem value={ALL_CATEGORIES}>Tất cả</MenuItem>
            {testCategories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      }
    />
  ) : (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  )
}
