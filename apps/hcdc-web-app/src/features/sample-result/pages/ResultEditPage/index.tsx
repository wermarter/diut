import { useLoaderData } from 'react-router-dom'

import { ResultEditPageParams, resultEditPageLoader } from './loader'
import { ResultEditView } from '../../components'
import { useSampleFindByIdQuery } from 'src/infra/api/access-service/sample'
import { ProgressBar } from 'src/components/ui'

export function urlResultEditPage(
  params: ResultEditPageParams = {
    sampleId: ':sampleId',
  },
) {
  return `/result/edit/${params.sampleId}`
}

export function ResultEditPage() {
  const { printFormMap, sampleId } = useLoaderData() as Awaited<
    ReturnType<typeof resultEditPageLoader>
  >

  const { data: sampleRes, isFetching } = useSampleFindByIdQuery(sampleId)

  return (
    <>
      {isFetching && <ProgressBar />}
      {sampleRes && (
        <ResultEditView sampleRes={sampleRes!} printFormMap={printFormMap} />
      )}
    </>
  )
}
