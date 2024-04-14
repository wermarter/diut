export * from './loader'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  useLoaderData,
  useRevalidator,
  useSearchParams,
} from 'react-router-dom'

import { TestElementTable } from '../../components'
import { manageTestElementPageLoader } from './loader'
import { ROWS_PER_PAGE_OPTIONS } from 'src/shared'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'

const PARAM_PAGE = 'page'
const PARAM_PAGE_SIZE = 'pageSize'
const PARAM_TEST_ID = 'testId'

export function urlManageTestElementPage() {
  return '/manage/test-elements'
}

export function ManageTestElementPage() {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { tests } = useLoaderData() as Awaited<
    ReturnType<typeof manageTestElementPageLoader>
  >
  const revalidator = useRevalidator()
  useEffect(() => {
    revalidator.revalidate()
  }, [branchId])

  const [searchParams, setSearchParams] = useSearchParams({
    [PARAM_PAGE]: '0',
    [PARAM_PAGE_SIZE]: ROWS_PER_PAGE_OPTIONS[0].toString(),
    [PARAM_TEST_ID]: tests[0]?._id,
  })
  const [testId, setTestId] = useState(searchParams.get(PARAM_TEST_ID)!)
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
        [PARAM_TEST_ID]: testId,
      },
      { replace: false },
    )
  }, [page, pageSize, testId])

  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    setPageCb('0')
    setTestId(tests[0]?._id)
  }, [tests[0]?._id])

  return (
    <TestElementTable
      page={parseInt(page)}
      pageSize={parseInt(pageSize)}
      setPage={setPage}
      setPageSize={setPageSize}
      tests={tests}
      testId={testId}
      setTestId={setTestId}
    />
  )
}
