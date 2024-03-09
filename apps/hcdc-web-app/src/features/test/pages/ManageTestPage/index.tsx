import { useCallback, useEffect, useRef, useState } from 'react'
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

export function urlManageTestPage() {
  return '/manage/tests'
}

export function ManageTestPage() {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { testCategories, bioProducts, instruments, printForms, sampleTypes } =
    useLoaderData() as Awaited<ReturnType<typeof manageTestPageLoader>>
  const revalidator = useRevalidator()
  const revalidateCallback = useCallback(() => {
    revalidator.revalidate()
  }, [revalidator])
  useEffect(() => {
    revalidator.revalidate()
  }, [branchId])

  const [searchParams, setSearchParams] = useSearchParams({
    [PARAM_PAGE]: '0',
    [PARAM_PAGE_SIZE]: ROWS_PER_PAGE_OPTIONS[0].toString(),
    [PARAM_CATEGORY_ID]: testCategories[0]?._id,
  })
  const [testCategoryId, setTestCategoryId] = useState(
    searchParams.get(PARAM_CATEGORY_ID)!,
  )
  const [page, setPageCb] = useState(searchParams.get(PARAM_PAGE)!)
  const [pageSize, setPageSizeCb] = useState(searchParams.get(PARAM_PAGE_SIZE)!)
  const setPage = useCallback((page: number) => setPageCb(page.toString()), [])
  const setPageSize = useCallback(
    (pageSize: number) => setPageSizeCb(pageSize.toString()),
    [],
  )

  useEffect(() => {
    setSearchParams(
      {
        [PARAM_PAGE]: page,
        [PARAM_PAGE_SIZE]: pageSize,
        [PARAM_CATEGORY_ID]: testCategoryId,
      },
      { replace: false },
    )
  }, [page, pageSize, testCategoryId])

  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    setPageCb('0')
    setTestCategoryId(testCategories[0]?._id)
  }, [testCategories[0]?._id])

  return (
    <TestTable
      page={parseInt(page)}
      pageSize={parseInt(pageSize)}
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
