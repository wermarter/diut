import { appStore } from 'src/infra/redux'
import { testCategoryApi } from 'src/infra/api/access-service/test-category'
import { bioProductApi } from 'src/infra/api/access-service/bio-product'
import { printFormApi } from 'src/infra/api/access-service/print-form'
import { authSlice } from 'src/features/auth'
import { instrumentApi } from 'src/infra/api/access-service/instrument'
import { sampleTypeApi } from 'src/infra/api/access-service/sample-type'

export const manageTestPageLoader = async () => {
  const branchId = authSlice.selectors.selectActiveBranchId(appStore.getState())

  const [
    categoryRes,
    bioProductRes,
    instrumentRes,
    printFormRes,
    sampleTypeRes,
  ] = await Promise.all([
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
        instrumentApi.endpoints.instrumentSearch.initiate({
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
    appStore
      .dispatch(
        sampleTypeApi.endpoints.sampleTypeSearch.initiate({
          sort: { displayIndex: 1 },
          filter: { branchId },
        }),
      )
      .unwrap(),
  ])

  return {
    testCategories: categoryRes?.items ?? [],
    bioProducts: bioProductRes?.items ?? [],
    instruments: instrumentRes?.items ?? [],
    printForms: printFormRes?.items ?? [],
    sampleTypes: sampleTypeRes?.items ?? [],
  }
}
