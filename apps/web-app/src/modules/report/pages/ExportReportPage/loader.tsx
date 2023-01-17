import { appStore } from 'src/core'
import { testApi } from 'src/api/test'
import { testComboApi } from 'src/api/test-combo'

export const exportReportPageLoader = async () => {
  const [testRes, testComboRes] = await Promise.all([
    appStore
      .dispatch(
        testApi.endpoints.testSearch.initiate({
          searchTestRequestDto: {
            sort: {
              category: 1,
            },
          },
        })
      )
      .unwrap(),
    appStore
      .dispatch(
        testComboApi.endpoints.testComboSearch.initiate({
          searchTestComboRequestDto: {
            sort: {
              index: 1,
            },
          },
        })
      )
      .unwrap(),
  ])

  return {
    tests: testRes?.items ?? [],
    testCombos: testComboRes?.items ?? [],
  }
}
