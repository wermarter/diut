import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import { SampleTypeTable } from '../../components'
import { ROWS_PER_PAGE_OPTIONS } from 'src/shared'

const PARAM_PAGE = 'page'
const PARAM_PAGE_SIZE = 'pageSize'

export default function ManageSampleTypePage() {
  const [searchParams, setSearchParams] = useSearchParams({
    [PARAM_PAGE]: '0',
    [PARAM_PAGE_SIZE]: ROWS_PER_PAGE_OPTIONS[0].toString(),
  })
  const page = parseInt(searchParams.get(PARAM_PAGE)!)
  const pageSize = parseInt(searchParams.get(PARAM_PAGE_SIZE)!)

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
    <>
      <SampleTypeTable
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </>
  )
}
