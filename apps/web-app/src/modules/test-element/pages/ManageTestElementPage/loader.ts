import { appStore } from 'src/core'
import { testCategoryApi } from 'src/api/test-category'
import { testApi } from 'src/api/test'

export const manageTestElemenentPageLoader = async () => {
  const [categoryRes, testRes] = await Promise.all([
    appStore
      .dispatch(
        testCategoryApi.endpoints.testCategorySearch.initiate({
          searchTestCategoryRequestDto: {
            sort: { index: 1 },
          },
        })
      )
      .unwrap(),
    appStore
      .dispatch(
        testApi.endpoints.testSearch.initiate({
          searchTestRequestDto: {
            sort: { index: 1 },
          },
        })
      )
      .unwrap(),
  ])

  return {
    testCategories: categoryRes?.items ?? [],
    testRes,
  }
}
