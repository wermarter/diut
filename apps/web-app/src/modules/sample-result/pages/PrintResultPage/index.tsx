import { useParams } from 'react-router-dom'

import { useSamplePrintByIdQuery } from 'src/api/sample'
import { LoadingPage } from 'src/common/layout/LoadingPage'

export default function PrintResultPage() {
  const { sampleId } = useParams()
  const { data, isLoading } = useSamplePrintByIdQuery({ id: sampleId! })

  return !isLoading ? (
    <object
      data={data as string}
      type="application/pdf"
      width="100%"
      height="900px"
    />
  ) : (
    <LoadingPage />
  )
}
