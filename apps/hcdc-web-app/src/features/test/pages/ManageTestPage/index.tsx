import { useCallback, useEffect } from 'react'
import {
  useLoaderData,
  useRevalidator,
  useSearchParams,
} from 'react-router-dom'

import { TestTable } from '../../components'
import { manageTestPageLoader } from './loader'
import { ROWS_PER_PAGE_OPTIONS } from 'src/shared'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'

const PARAM_PAGE = 'page'
const PARAM_PAGE_SIZE = 'pageSize'
const PARAM_CATEGORY_ID = 'categoryId'

export default function ManageTestPage() {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { testCategories, bioProducts, instruments, printForms, sampleTypes } =
    useLoaderData() as Awaited<ReturnType<typeof manageTestPageLoader>>
  const revalidator = useRevalidator()
  const [searchParams, setSearchParams] = useSearchParams({
    [PARAM_PAGE]: '0',
    [PARAM_PAGE_SIZE]: ROWS_PER_PAGE_OPTIONS[0].toString(),
    [PARAM_CATEGORY_ID]: testCategories[0]?._id,
  })
  const testCategoryId = searchParams.get(PARAM_CATEGORY_ID)!
  const page = parseInt(searchParams.get(PARAM_PAGE)!)
  const pageSize = parseInt(searchParams.get(PARAM_PAGE_SIZE)!)

  const revalidateCallback = useCallback(() => {
    revalidator.revalidate()
  }, [revalidator])

  useEffect(() => {
    revalidator.revalidate()
  }, [branchId])

  const setTestCategoryId = useCallback(
    (id: string) => {
      setSearchParams(
        (searchParams) => {
          searchParams.set(PARAM_CATEGORY_ID, id)
          return searchParams
        },
        { replace: false },
      )
    },
    [setSearchParams, searchParams],
  )

  useEffect(() => {
    setTestCategoryId(testCategories[0]._id)
  }, [testCategories[0]._id])

  const setPage = useCallback(
    (newPage: number) => {
      setSearchParams(
        (searchParams) => {
          searchParams.set(PARAM_PAGE, newPage.toString())
          return searchParams
        },
        { replace: false },
      )
    },
    [setSearchParams, searchParams],
  )

  const setPageSize = useCallback(
    (newPageSize: number) => {
      setSearchParams(
        (searchParams) => {
          searchParams.set(PARAM_PAGE_SIZE, newPageSize.toString())
          return searchParams
        },
        { replace: false },
      )
    },
    [setSearchParams, searchParams],
  )

  return (
    <TestTable
      page={page}
      pageSize={pageSize}
      setPage={setPage}
      setPageSize={setPageSize}
      testCategories={testCategories}
      bioProducts={bioProducts}
      instruments={instruments}
      printForms={printForms}
      sampleTypes={sampleTypes}
      revalidateCallback={revalidateCallback}
      testCategoryId={testCategoryId}
      setTestCategoryId={setTestCategoryId}
    />
  )
}
