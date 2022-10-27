import { Skeleton } from '@mui/material'
import _ from 'lodash-es'

import { useSampleSearchQuery } from 'src/api/sample'
import { DataTable } from 'src/common/components/DataTable'

export default function InfoEditPage() {
  const { data, isFetching } = useSampleSearchQuery({
    searchSampleRequestDto: { sort: { createdAt: -1 } },
  })

  return !isFetching ? (
    <DataTable
      rows={data?.items!}
      getRowId={(row) => row._id}
      columns={[
        {
          field: 'oneAndOnly',
          headerName: 'The datum',
          flex: 1,
          valueGetter: ({ row }) => {
            return JSON.stringify(
              _.pick(row, ['patientId', 'sampleTypeIds', 'results'])
            )
          },
        },
      ]}
    />
  ) : (
    <Skeleton variant="rounded" width="100%" height="400px" />
  )
}
