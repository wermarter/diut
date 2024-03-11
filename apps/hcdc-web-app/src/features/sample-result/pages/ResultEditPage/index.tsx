import { useEffect } from 'react'
import { useLoaderData, useRevalidator } from 'react-router-dom'

import { ResultEditPageParams, resultEditPageLoader } from './loader'
import { ResultEditView } from '../../components'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'

export function urlResultEditPage(
  params: ResultEditPageParams = {
    sampleId: ':sampleId',
  },
) {
  return `/result/edit/${params.sampleId}`
}

export function ResultEditPage() {
  const { sampleRes } = useLoaderData() as Awaited<
    ReturnType<typeof resultEditPageLoader>
  >
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const revalidator = useRevalidator()

  useEffect(() => {
    revalidator.revalidate()
  }, [branchId])

  return <ResultEditView sampleRes={sampleRes} />
}
