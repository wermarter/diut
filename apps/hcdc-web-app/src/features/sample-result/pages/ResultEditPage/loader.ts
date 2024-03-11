import { LoaderFunctionArgs } from 'react-router-dom'

import { appStore } from 'src/infra/redux'
import { sampleApi } from 'src/infra/api/access-service/sample'

export type ResultEditPageParams = {
  sampleId: string
}

export const resultEditPageLoader = async ({ params }: LoaderFunctionArgs) => {
  const { sampleId } = params as ResultEditPageParams
  const sampleRes = await appStore
    .dispatch(sampleApi.endpoints.sampleFindById.initiate(sampleId))
    .unwrap()

  return {
    sampleRes,
  }
}
