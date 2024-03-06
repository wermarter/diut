import { useCallback, useEffect, useRef } from 'react'
import {
  useLoaderData,
  useRevalidator,
  useSearchParams,
} from 'react-router-dom'

import { TestElementTable } from '../../components'
import { manageTestElemenentPageLoader } from './loader'
import { ROWS_PER_PAGE_OPTIONS } from 'src/shared'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'

const PARAM_PAGE = 'page'
const PARAM_PAGE_SIZE = 'pageSize'
const PARAM_TEST_ID = 'testId'

export default function ManageTestElementPage() {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { tests } = useLoaderData() as Awaited<
    ReturnType<typeof manageTestElemenentPageLoader>
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
  const testId = searchParams.get(PARAM_TEST_ID)!
  const page = parseInt(searchParams.get(PARAM_PAGE)!)
  const pageSize = parseInt(searchParams.get(PARAM_PAGE_SIZE)!)

  const setTestId = useCallback(
    (id: string) => {
      setSearchParams(
        (searchParams) => {
          console.log('setTestId', { searchParams, id })
          searchParams.set(PARAM_TEST_ID, id)
          return searchParams
        },
        { replace: true },
      )
    },
    [setSearchParams, searchParams],
  )

  const setPage = useCallback(
    (newPage: number) => {
      setSearchParams(
        (searchParams) => {
          console.log('setPage', { searchParams, newPage })
          searchParams.set(PARAM_PAGE, newPage.toString())
          return searchParams
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  const setPageSize = useCallback(
    (newPageSize: number) => {
      setSearchParams(
        (searchParams) => {
          console.log('setPageSize', { searchParams, newPageSize })
          searchParams.set(PARAM_PAGE_SIZE, newPageSize.toString())
          return searchParams
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  return (
    <TestElementTable
      page={page}
      pageSize={pageSize}
      setPage={setPage}
      setPageSize={setPageSize}
      tests={tests}
      testId={testId}
      setTestId={setTestId}
    />
  )
}
