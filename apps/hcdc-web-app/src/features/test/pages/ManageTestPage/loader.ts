import { appStore } from 'src/infra/redux'
import { testCategoryApi } from 'src/infra/api/access-service/test-category'
import { bioProductApi } from 'src/infra/api/access-service/bio-product'
import { printFormApi } from 'src/infra/api/access-service/print-form'

export const manageTestPageLoader = async () => {
  const [categoryRes, bioProductRes, printFormRes] = await Promise.all([
    appStore
      .dispatch(
        testCategoryApi.endpoints.testCategorySearch.initiate({
          searchTestCategoryRequestDto: {
            sort: { index: 1 },
          },
        }),
      )
      .unwrap(),
    appStore
      .dispatch(
        bioProductApi.endpoints.bioProductSearch.initiate({
          searchBioProductRequestDto: {
            sort: { index: 1 },
          },
        }),
      )
      .unwrap(),
    appStore
      .dispatch(
        printFormApi.endpoints.printFormSearch.initiate({
          searchPrintFormRequestDto: {
            sort: { index: 1 },
          },
        }),
      )
      .unwrap(),
  ])

  return {
    testCategories: categoryRes?.items ?? [],
    bioProducts: bioProductRes?.items ?? [],
    printForms: printFormRes?.items ?? [],
  }
}
