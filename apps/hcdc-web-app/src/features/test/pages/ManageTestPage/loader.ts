import { authSlice } from 'src/features/auth'
import {
  fetchBioProducts,
  fetchInstruments,
  fetchPrintForms,
  fetchSampleTypes,
  fetchTestCategories,
} from 'src/infra/api'
import { appStore } from 'src/infra/redux'

export const manageTestPageLoader = async () => {
  const branchId = authSlice.selectors.selectActiveBranchId(
    appStore.getState(),
  )!

  const [
    categoryRes,
    bioProductRes,
    instrumentRes,
    printFormRes,
    sampleTypeRes,
  ] = await Promise.all([
    appStore.dispatch(fetchTestCategories(branchId)).unwrap(),
    appStore.dispatch(fetchBioProducts(branchId)).unwrap(),
    appStore.dispatch(fetchInstruments(branchId)).unwrap(),
    appStore.dispatch(fetchPrintForms(branchId)).unwrap(),
    appStore.dispatch(fetchSampleTypes(branchId)).unwrap(),
  ])

  return {
    testCategories: categoryRes?.items ?? [],
    bioProducts: bioProductRes?.items ?? [],
    instruments: instrumentRes?.items ?? [],
    sampleTypes: sampleTypeRes?.items ?? [],
    printForms: printFormRes.items,
    printFormMap: new Map(
      printFormRes.items.map((printForm) => [printForm._id, printForm]),
    ),
  }
}
