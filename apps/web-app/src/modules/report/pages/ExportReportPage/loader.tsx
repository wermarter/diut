import { appStore } from 'src/core'
import { testApi } from 'src/api/test'
import { testComboApi } from 'src/api/test-combo'

export const exportReportPageLoader = async () => {
  const [testRes, testComboRes] = await Promise.all([
    appStore
      .dispatch(
        testApi.endpoints.testSearch.initiate({
          searchTestRequestDto: {},
        })
      )
      .unwrap(),
    appStore
      .dispatch(
        testComboApi.endpoints.testComboSearch.initiate({
          searchTestComboRequestDto: {},
        })
      )
      .unwrap(),
  ])

  return {
    tests: testRes?.items ?? [],
    testCombos: testComboRes?.items ?? [],
  }
}
