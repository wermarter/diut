import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { DoctorTable } from '../../components'
import { ROWS_PER_PAGE_OPTIONS } from 'src/shared'

const PARAM_PAGE = 'page'
const PARAM_PAGE_SIZE = 'pageSize'

export function urlManageDoctorPage() {
  return '/manage/doctors'
}

export function ManageDoctorPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    [PARAM_PAGE]: '0',
    [PARAM_PAGE_SIZE]: ROWS_PER_PAGE_OPTIONS[0].toString(),
  })
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
      },
      { replace: false },
    )
  }, [page, pageSize])

  return (
    <>
      <DoctorTable
        page={parseInt(page)}
        pageSize={parseInt(pageSize)}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </>
  )
}
