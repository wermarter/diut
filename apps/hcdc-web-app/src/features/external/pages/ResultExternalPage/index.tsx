export * from './loader'
import { useLoaderData } from 'react-router-dom'
import { ResultEditView } from 'src/features/sample-result'
import { resultExternalPageLoader } from './loader'

export function urlResultExternalPage() {
  return `/external/sample-result`
}

export function ResultExternalPage() {
  const { sampleRes, printFormMap } = useLoaderData() as Awaited<
    ReturnType<typeof resultExternalPageLoader>
  >

  return (
    <ResultEditView
      isExternal
      sampleRes={sampleRes as any}
      printFormMap={printFormMap as any}
    />
  )
}
