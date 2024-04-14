import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  useTestElementCreateMutation,
  useTestElementDeleteByIdMutation,
  useTestElementSearchQuery,
  useTestElementUpdateByIdMutation,
  useLazyTestElementSearchQuery,
  TestElementSearchRequestDto,
} from 'src/infra/api/access-service/test-element'
import { CrudTable } from 'src/components/table'
import { usePagination } from 'src/shared/hooks'
import { testElementColumns } from './columns'
import { TestResponseDto } from 'src/infra/api/access-service/test'
import { NormalRuleEditor } from '../NormalRuleEditor'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { FormAutocomplete, FormContainer } from 'src/components/form'

type TestElementTableProps = {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  tests: TestResponseDto[]
  testId: string
  setTestId: (id: string) => void
}

type FormData = {
  testId: string
}

export function TestElementTable(props: TestElementTableProps) {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { filterObj, setFilterObj } =
    usePagination<TestElementSearchRequestDto>({
      offset: props.page,
      limit: props.pageSize,
      sort: { displayIndex: 1 },
    })

  const [ruleRow, setRuleRow] = useState<string | null>(null)

  const { control, handleSubmit, setValue } = useForm<FormData>()

  useEffect(() => {
    if (branchId) {
      setFilterObj((prev) => ({
        ...prev,
        filter: { ...prev.filter, branchId },
      }))
    }
  }, [branchId])

  useEffect(() => {
    setValue('testId', props.testId)
    setFilterObj((prev) => ({
      ...prev,
      filter: { ...prev.filter, testId: props.testId },
    }))
  }, [props.testId])

  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
  }, [])

  const { data, isFetching } = useTestElementSearchQuery(filterObj, {
    skip: isFirstRun.current,
  })

  const [searchTestElements] = useLazyTestElementSearchQuery()

  const [createTestElement, { isLoading: isCreating }] =
    useTestElementCreateMutation()
  const [updateTestElement, { isLoading: isUpdating }] =
    useTestElementUpdateByIdMutation()
  const [deleteTestElement, { isLoading: isDeleting }] =
    useTestElementDeleteByIdMutation()

  return (
    <>
      <CrudTable
        items={data?.items}
        itemIdField="_id"
        isLoading={isFetching || isCreating || isUpdating || isDeleting}
        fieldColumns={testElementColumns}
        rowCount={data?.total ?? 0}
        page={data?.offset!}
        pageSize={data?.limit!}
        onPageChange={props.setPage}
        onPageSizeChange={props.setPageSize}
        onItemCreate={async (item) => {
          await createTestElement({
            name: item.name,
            displayIndex: item.displayIndex,
            printIndex: item.printIndex,
            reportIndex: item.reportIndex,
            isParent: item.isParent,
            unit: item.unit,
            normalRules: [],
            testId: props.testId,
            branchId,
          }).unwrap()
        }}
        onItemUpdate={async (newItem) => {
          await updateTestElement({
            id: newItem._id,
            testElementUpdateRequestDto: {
              name: newItem.name,
              displayIndex: newItem.displayIndex,
              printIndex: newItem.printIndex,
              reportIndex: newItem.reportIndex,
              isParent: newItem.isParent,
              unit: newItem.unit,
            },
          }).unwrap()
        }}
        onItemDelete={async (item) => {
          await deleteTestElement(item._id).unwrap()
        }}
        onRefresh={async () => {
          await searchTestElements(filterObj).unwrap()
        }}
        TopLeftComponent={
          <FormContainer
            autoComplete="off"
            onSubmit={handleSubmit((data) => {
              props.setPage(0)
              props.setTestId(data.testId)
            })}
          >
            <FormAutocomplete
              textFieldProps={{
                color: 'secondary',
                focused: true,
                autoFocus: true,
                fullWidth: true,
                sx: { minWidth: '300px' },
              }}
              size="small"
              label="Chọn XN"
              control={control}
              name="testId"
              options={props.tests}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              groupBy={(option) => option.testCategory?.name ?? ''}
            />
          </FormContainer>
        }
        customRowActions={[
          {
            label: 'Tham chiếu',
            action: (testElement) => {
              setRuleRow(testElement._id)
            },
          },
        ]}
      />
      <NormalRuleEditor
        testElementId={ruleRow}
        onClose={() => {
          setRuleRow(null)
        }}
      />
    </>
  )
}
