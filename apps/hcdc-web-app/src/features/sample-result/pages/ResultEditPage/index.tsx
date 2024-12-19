export * from './loader'
import { useLoaderData } from 'react-router-dom'
import { ProgressBar } from 'src/components/ui'
import { useSampleFindByIdQuery } from 'src/infra/api/access-service/sample'
import { ResultEditView } from '../../components'
import { ResultEditPageParams, resultEditPageLoader } from './loader'

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
