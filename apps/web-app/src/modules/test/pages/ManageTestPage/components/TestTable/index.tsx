import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from '@mui/material'
import {
  BioProductResponseDto,
  useBioProductSearchQuery,
} from 'src/api/bio-product'

import {
  useTestCreateMutation,
  useTestDeleteByIdMutation,
  useTestSearchQuery,
  useTestUpdateByIdMutation,
  useLazyTestSearchQuery,
} from 'src/api/test'
import { useTestCategorySearchQuery } from 'src/api/test-category'
import { CrudTable } from 'src/common/components/CrudTable'
import { useCrudPagination } from 'src/common/hooks'
import { NO_BIOPRODUCT, useTestColumns } from './columns'

const ALL_CATEGORIES = 'ALL_CATEGORIES'

function setBioProductId(
  bioProducts: BioProductResponseDto[],
  bioProductId: string
) {
  if (bioProductId === NO_BIOPRODUCT) {
    return null
  }
  return bioProducts.find(
    (bioProduct) => bioProduct.name === (bioProductId as any)
  )?._id!
}

export function TestTable() {
  const { data: categoryRes, isFetching: isLoadingTestCategories } =
    useTestCategorySearchQuery({
      searchTestCategoryRequestDto: {
        sort: { leftRightIndex: 1 },
      },
    })

  const { data: bioProductsRes, isFetching: isLoadingBioProducts } =
    useBioProductSearchQuery({
      searchBioProductRequestDto: {
        sort: { leftRightIndex: 1 },
      },
    })

  const testCategories = categoryRes?.items ?? []
  const bioProducts = bioProductsRes?.items ?? []

  const columns = useTestColumns(testCategories, bioProducts)

  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    useCrudPagination({
      sort: { topBottomIndex: 1 },
      offset: 0,
    })

  const { data, isFetching } = useTestSearchQuery({
    searchTestRequestDto: filterObj,
  })
  const [searchTests] = useLazyTestSearchQuery()

  const [createTest, { isLoading: isCreating }] = useTestCreateMutation()
  const [updateTest, { isLoading: isUpdating }] = useTestUpdateByIdMutation()
  const [deleteTest, { isLoading: isDeleting }] = useTestDeleteByIdMutation()

  return data?.items !== undefined &&
    !isLoadingTestCategories &&
    !isLoadingBioProducts ? (
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
          createTestRequestDto: {
            name: item.name,
            topBottomIndex: item.topBottomIndex,
            category: testCategories.find(
              (category) => category.name === (item.category as any)
            )?._id!,
            bioProduct: setBioProductId(bioProducts, item.bioProduct as any)!,
          },
        }).unwrap()
      }}
      onItemUpdate={async (newItem, oldItem) => {
        await updateTest({
          id: newItem._id,
          updateTestRequestDto: {
            name: newItem.name,
            topBottomIndex: newItem.topBottomIndex,
            category: testCategories.find(
              (category) => category.name === (newItem.category as any)
            )?._id,
            bioProduct: setBioProductId(
              bioProducts,
              newItem.bioProduct as any
            )!,
          },
        }).unwrap()
      }}
      onItemDelete={async (item) => {
        await deleteTest({
          id: item._id,
        }).unwrap()
      }}
      onRefresh={async () => {
        await searchTests({
          searchTestRequestDto: filterObj,
        }).unwrap()
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
                    category: categoryId,
                  },
                }))
              } else {
                setFilterObj((filterObj) => ({
                  ...filterObj,
                  offset: 0,
                  filter: {
                    ...filterObj.filter,
                    category: undefined,
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
    <Skeleton variant="rounded" width="100%" height="400px" />
  )
}
