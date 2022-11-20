import { appStore } from 'src/core'
import { printFormApi } from 'src/api/print-form'

export const printSelectPageLoader = async () => {
  const [printFormData] = await Promise.all([
    appStore
      .dispatch(
        printFormApi.endpoints.printFormSearch.initiate({
          searchPrintFormRequestDto: { sort: { index: 1 } },
        })
      )
      .unwrap(),
  ])

  return { printFormData }
}
