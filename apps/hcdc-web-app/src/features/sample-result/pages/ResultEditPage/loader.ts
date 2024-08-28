import { LoaderFunctionArgs } from 'react-router-dom'

import { printFormApi } from 'src/infra/api/access-service/print-form'
import { sampleApi } from 'src/infra/api/access-service/sample'
import { appStore } from 'src/infra/redux'

export type ResultEditPageParams = {
  sampleId: string
}

export const resultEditPageLoader = async ({ params }: LoaderFunctionArgs) => {
  const { sampleId } = params as ResultEditPageParams

  const sampleRes = await appStore
    .dispatch(sampleApi.endpoints.sampleFindById.initiate(sampleId))
    .unwrap()

  const printFormRes = await appStore
    .dispatch(
      printFormApi.endpoints.printFormSearch.initiate({
        sort: { displayIndex: 1 },
        filter: { branchId: sampleRes.branchId },
      }),
    )
    .unwrap()

  return {
    sampleId,
    printFormMap: new Map(
      printFormRes.items.map((printForm) => [printForm._id, printForm]),
    ),
  }
}
