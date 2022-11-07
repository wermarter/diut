import { useParams } from 'react-router-dom'

import { useSamplePrintByIdQuery } from 'src/api/sample'
import { LoadingPage } from 'src/common/layout/LoadingPage'
import { drawerWidth } from 'src/common/layout/MainLayout'

export default function PrintResultPage() {
  const { sampleId } = useParams()
  const { data, isFetching } = useSamplePrintByIdQuery(
    { id: sampleId! },
    { refetchOnMountOrArgChange: true }
  )

  return !isFetching ? (
    <object
      data={data as string}
      type="application/pdf"
      style={{
        position: 'absolute',
        width: `calc(100% - ${drawerWidth}px`,
        height: `calc(100% - 48px)`,
      }}
    />
  ) : (
    <LoadingPage />
  )
}
