import { LoaderFunctionArgs } from 'react-router-dom'
import { externalApi } from 'src/infra/api/access-service/external'
import { appStore } from 'src/infra/redux'

export const resultExternalPageLoader = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const queryParams = new URLSearchParams(url.search)
  const jwt = queryParams.get('jwt')

  if (jwt === null) {
    throw new Error('Link thiếu JWT')
  }

  try {
    const data = await appStore
      .dispatch(externalApi.endpoints.externalGetSampleResult.initiate(jwt))
      .unwrap()

    return {
      sampleRes: data.sample,
      printFormMap: new Map(
        data.printForms.map((printForm) => [printForm._id, printForm]),
      ),
    }
  } catch (error) {
    throw new Error(`Lỗi khi lấy dữ liệu: ${JSON.stringify(error)}`)
  }
}
