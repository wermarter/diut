import { useCallback, useEffect, useState } from 'react'
import {
  useLoaderData,
  useRevalidator,
  useSearchParams,
} from 'react-router-dom'

import { TestTable } from '../../components'
import { manageTestPageLoader } from './loader'
import { ROWS_PER_PAGE_OPTIONS } from 'src/shared'

const PARAM_PAGE = 'page'
const PARAM_PAGE_SIZE = 'pageSize'
const PARAM_CATEGORY_ID = 'categoryId'

export default function ManageTestPage() {
  const { testCategories, bioProducts, instruments, printForms, sampleTypes } =
    useLoaderData() as Awaited<ReturnType<typeof manageTestPageLoader>>
  const revalidator = useRevalidator()
  const [searchParams, setSearchParams] = useSearchParams({
    [PARAM_PAGE]: '0',
    [PARAM_PAGE_SIZE]: ROWS_PER_PAGE_OPTIONS[0].toString(),
    [PARAM_CATEGORY_ID]: testCategories[0]?._id,
  })
  const paramCategoryId = searchParams.get(PARAM_CATEGORY_ID)!
  const page = parseInt(searchParams.get(PARAM_PAGE)!)
  const pageSize = parseInt(searchParams.get(PARAM_PAGE_SIZE)!)

  const [selectedCategoryId, setSelectedCategoryId] = useState(paramCategoryId)

  useEffect(() => {
    if (paramCategoryId) {
      setSelectedCategoryId(paramCategoryId)
    }
  }, [paramCategoryId])

  const revalidateCallback = useCallback(() => {
    revalidator.revalidate()
  }, [revalidator])

  const setTestCategoryId = useCallback(
    (id: string) => {
      setSearchParams(
        (searchParams) => {
          searchParams.set(PARAM_CATEGORY_ID, id)
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
      testCategoryId={selectedCategoryId}
      setTestCategoryId={setTestCategoryId}
    />
  )
}
