import { useCallback, useEffect, useState } from 'react'
import {
  useLoaderData,
  useRevalidator,
  useSearchParams,
} from 'react-router-dom'

import { TestTable } from '../../components'
import { manageTestPageLoader } from './loader'

const PARAM_CATEGORY_ID = 'categoryId'

export default function ManageTestPage() {
  const { testCategories, bioProducts, printForms } =
    useLoaderData() as Awaited<ReturnType<typeof manageTestPageLoader>>
  const revalidator = useRevalidator()
  const [searchParams, setSearchParams] = useSearchParams()

  const paramCategoryId = searchParams.get(PARAM_CATEGORY_ID)
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    paramCategoryId ?? testCategories[0]?._id,
  )

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
      setSearchParams({ [PARAM_CATEGORY_ID]: id }, { replace: false })
    },
    [setSearchParams],
  )

  return (
    <TestTable
      {...{
        testCategories,
        bioProducts,
        printForms,
        revalidateCallback,
        testCategoryId: selectedCategoryId,
        setTestCategoryId,
      }}
    />
  )
}
