import { useCallback } from 'react'
import { useLoaderData, useSearchParams } from 'react-router-dom'

import { TestElementTable } from '../../components'
import { manageTestElemenentPageLoader } from './loader'
import { ROWS_PER_PAGE_OPTIONS } from 'src/shared'

const PARAM_PAGE = 'page'
const PARAM_PAGE_SIZE = 'pageSize'
const PARAM_TEST_ID = 'testId'

export default function ManageTestElementPage() {
  const { tests } = useLoaderData() as Awaited<
    ReturnType<typeof manageTestElemenentPageLoader>
  >
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
          searchParams.set(PARAM_TEST_ID, id)
          return searchParams
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  const setPage = useCallback(
    (newPage: number) => {
      setSearchParams(
        (searchParams) => {
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
