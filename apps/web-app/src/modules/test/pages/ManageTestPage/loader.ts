import { appStore } from 'src/core'
import { testCategoryApi } from 'src/api/test-category'
import { bioProductApi } from 'src/api/bio-product'

export const manageTestPageLoader = async () => {
  const [categoryRes, bioProductRes] = await Promise.all([
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
        bioProductApi.endpoints.bioProductSearch.initiate({
          searchBioProductRequestDto: {
            sort: { index: 1 },
          },
        })
      )
      .unwrap(),
  ])

  return {
    testCategories: categoryRes?.items ?? [],
    bioProducts: bioProductRes?.items ?? [],
  }
}
