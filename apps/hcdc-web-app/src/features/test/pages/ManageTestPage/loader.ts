import { appStore } from 'src/infra/redux'
import { testCategoryApi } from 'src/infra/api/access-service/test-category'
import { bioProductApi } from 'src/infra/api/access-service/bio-product'
import { printFormApi } from 'src/infra/api/access-service/print-form'
import { authSlice } from 'src/features/auth'

export const manageTestPageLoader = async () => {
  const branchId = authSlice.selectors.selectActiveBranchId(appStore.getState())

  const [categoryRes, bioProductRes, printFormRes] = await Promise.all([
    appStore
      .dispatch(
        testCategoryApi.endpoints.testCategorySearch.initiate({
          sort: { displayIndex: 1 },
          filter: { branchId },
        }),
      )
      .unwrap(),
    appStore
      .dispatch(
        bioProductApi.endpoints.bioProductSearch.initiate({
          sort: { displayIndex: 1 },
          filter: { branchId },
        }),
      )
      .unwrap(),
    appStore
      .dispatch(
        printFormApi.endpoints.printFormSearch.initiate({
          sort: { displayIndex: 1 },
          filter: { branchId },
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
