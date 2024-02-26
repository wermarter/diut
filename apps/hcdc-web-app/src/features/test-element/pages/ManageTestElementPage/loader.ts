import { appStore } from 'src/infra/redux'
import { testCategoryApi } from 'src/infra/api/access-service/test-category'
import { testApi } from 'src/infra/api/access-service/test'

export const manageTestElemenentPageLoader = async () => {
  const [categoryRes, testRes] = await Promise.all([
    appStore
      .dispatch(
        testCategoryApi.endpoints.testCategorySearch.initiate({
          sort: { displayIndex: 1 },
        }),
      )
      .unwrap(),
    appStore
      .dispatch(
        testApi.endpoints.testSearch.initiate({
          sort: { displayIndex: 1 },
        }),
      )
      .unwrap(),
  ])

  return {
    testCategories: categoryRes?.items ?? [],
    testRes,
  }
}
