export * from './loader'
import { useCallback, useEffect, useState } from 'react'
import {
  useLoaderData,
  useRevalidator,
  useSearchParams,
} from 'react-router-dom'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'
import { ROWS_PER_PAGE_OPTIONS } from 'src/shared'
import { UserTable } from '../../components'
import { manageUserPageLoader } from './loader'

const PARAM_PAGE = 'page'
const PARAM_PAGE_SIZE = 'pageSize'

export function urlManageUserPage() {
  return '/manage/users'
}

export function ManageUserPage() {
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const { roleMap, roles, branches } = useLoaderData() as Awaited<
    ReturnType<typeof manageUserPageLoader>
  >
  const revalidator = useRevalidator()
  useEffect(() => {
    revalidator.revalidate()
  }, [branchId])

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
      { replace: true },
    )
  }, [page, pageSize])

  return (
    <>
      <UserTable
        page={parseInt(page)}
        pageSize={parseInt(pageSize)}
        setPage={setPage}
        setPageSize={setPageSize}
        roleMap={roleMap}
        roles={roles}
        branches={branches}
      />
    </>
  )
}
