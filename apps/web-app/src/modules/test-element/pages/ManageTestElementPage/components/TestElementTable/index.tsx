import * as React from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from '@mui/material'
import { toast } from 'react-toastify'
import { PatientCategory } from '@diut/common'
import { useLoaderData } from 'react-router-dom'

import {
  useTestElementCreateMutation,
  useTestElementDeleteByIdMutation,
  useTestElementSearchQuery,
  useTestElementUpdateByIdMutation,
  useLazyTestElementSearchQuery,
  TestElementResponseDto,
  HighlightRuleDto,
} from 'src/api/test-element'
import { CrudTable } from 'src/common/components/CrudTable'
import { useCrudPagination } from 'src/common/hooks'
import {
  NO_MIN,
  NO_MAX,
  NO_DESCRIPTION,
  NO_NORMAL_VALUE,
  useTestElementColumns,
  NO_NOTE,
} from './columns'
import { useLazyTestSearchQuery } from 'src/api/test'
import { HighlightRuleEditor } from './HighlightRuleEditor'
import { manageTestElemenentPageLoader } from '../../loader'

const ALL_CATEGORIES = 'ALL_CATEGORIES'
const ALL_TESTS = 'ALL_TESTS'

export function TestElementTable() {
  const { testCategories, testRes } = useLoaderData() as Awaited<
    ReturnType<typeof manageTestElemenentPageLoader>
  >

  const [ruleRow, setRuleRow] = React.useState<TestElementResponseDto | null>(
    null
  )

  const [selectedCategoryId, setSelectedCategoryId] =
    React.useState<string>(ALL_CATEGORIES)
  const [selectedTestId, setSelectedTestId] = React.useState<string>(ALL_TESTS)

  const [searchTest, { data: testLazyRes, isFetching: isLoadingLazyTest }] =
    useLazyTestSearchQuery()

  React.useEffect(() => {
    if (selectedTestId !== ALL_TESTS) {
      setFilterObj((filterObj) => ({
        ...filterObj,
        offset: 0,
        filter: {
          ...filterObj.filter,
          test: selectedTestId,
        },
      }))
    } else {
      setFilterObj((filterObj) => ({
        ...filterObj,
        offset: 0,
        filter: {
          ...filterObj.filter,
          test: undefined,
        },
      }))
    }
  }, [selectedTestId])

  React.useEffect(() => {
    if (selectedCategoryId === ALL_CATEGORIES) {
      searchTest({
        searchTestRequestDto: {
          sort: { index: 1 },
        },
      })
    } else {
      searchTest({
        searchTestRequestDto: {
          sort: { index: 1 },
          filter: { category: selectedCategoryId },
        },
      })
    }
  }, [selectedCategoryId])

  const tests = testLazyRes?.items ?? testRes?.items ?? []
  const columns = useTestElementColumns(tests)

  const { filterObj, setFilterObj, onPageChange, onPageSizeChange } =
    useCrudPagination({
      sort: { index: 1 },
      offset: 0,
    })

  const { data, isFetching } = useTestElementSearchQuery({
    searchTestElementRequestDto: filterObj,
  })
  const [searchTestElements] = useLazyTestElementSearchQuery()

  const [createTestElement, { isLoading: isCreating }] =
    useTestElementCreateMutation()
  const [updateTestElement, { isLoading: isUpdating }] =
    useTestElementUpdateByIdMutation()
  const [deleteTestElement, { isLoading: isDeleting }] =
    useTestElementDeleteByIdMutation()

  return data?.items !== undefined ? (
    <>
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
          await createTestElement({
            createTestElementRequestDto: {
              name: item.name,
              index: item.index,
              test: tests.find((test) => test.name === (item.test as any))
                ?._id!,
              isParent: item.isParent,
              highlightRules: processHighlightRules(item),
              unit: item.unit,
            },
          }).unwrap()
        }}
        onItemUpdate={async (newItem, oldItem) => {
          await updateTestElement({
            id: newItem._id,
            updateTestElementRequestDto: {
              name: newItem.name,
              index: newItem.index,
              test: tests.find((test) => test.name === (newItem.test as any))
                ?._id,
              isParent: newItem.isParent,
              highlightRules: processHighlightRules(newItem),
              unit: newItem.unit,
            },
          }).unwrap()
        }}
        onItemDelete={async (item) => {
          await deleteTestElement({
            id: item._id,
          }).unwrap()
        }}
        onRefresh={async () => {
          await searchTestElements({
            searchTestElementRequestDto: filterObj,
          }).unwrap()
        }}
        TopRightComponent={
          <Box sx={{ display: 'flex' }}>
            <FormControl
              fullWidth
              size="small"
              sx={{ minWidth: '300px', mr: 1 }}
            >
              <InputLabel>Nhóm xét nghiệm</InputLabel>
              <Select
                label="Nhóm xét nghiệm"
                defaultValue={ALL_CATEGORIES}
                onChange={({ target }) => {
                  setSelectedCategoryId(target?.value)
                  setSelectedTestId(ALL_TESTS)
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
            <FormControl
              fullWidth
              size="small"
              sx={{ minWidth: '300px' }}
              disabled={isLoadingLazyTest}
            >
              <InputLabel>Tên xét nghiệm</InputLabel>
              <Select
                label="Tên xét nghiệm"
                value={selectedTestId}
                onChange={({ target }) => {
                  setSelectedTestId(target?.value)
                }}
              >
                <MenuItem value={ALL_TESTS}>Tất cả</MenuItem>
                {tests.map((test) => (
                  <MenuItem key={test._id} value={test._id}>
                    {test.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        customRowActions={[
          {
            label: 'Tham chiếu',
            action: (testElement) => {
              setRuleRow(testElement)
            },
          },
        ]}
      />
      {ruleRow !== null && (
        <HighlightRuleEditor
          element={ruleRow}
          onClose={() => {
            setRuleRow(null)
          }}
          onSubmit={(highlightRules) => {
            updateTestElement({
              id: ruleRow?._id!,
              updateTestElementRequestDto: { highlightRules },
            }).then(() => {
              toast.success('Đặt tham chiếu thành công.')
            })
          }}
          isSubmitting={isUpdating}
        />
      )}
    </>
  ) : (
    <Skeleton variant="rounded" width="100%" height="400px" />
  )
}

function processHighlightRules(item: any): HighlightRuleDto[] {
  const firstRule = item.highlightRules?.[0]

  if (
    firstRule?.category !== undefined &&
    firstRule?.category !== PatientCategory.Any
  ) {
    return item.highlightRules.map((rule: HighlightRuleDto) => ({
      ...rule,
      defaultChecked: rule.defaultChecked ?? false,
    }))
  }

  const {
    anyMin,
    anyMax,
    anyNormal,
    anyDescription,
    anyNote,
    anyDefaultChecked,
  } = item
  const result: HighlightRuleDto = {
    category: PatientCategory.Any,
    defaultChecked: anyDefaultChecked ?? false,
  }

  if (anyMin !== NO_MIN) {
    result.min = anyMin
  }

  if (anyMax !== NO_MAX) {
    result.max = anyMax
  }

  if (anyNormal !== NO_NORMAL_VALUE) {
    result.normalValue = anyNormal
  }

  if (anyDescription !== NO_DESCRIPTION) {
    result.description = anyDescription
  }

  if (anyNote !== NO_NOTE) {
    result.note = anyNote
  }

  return [result]
}
