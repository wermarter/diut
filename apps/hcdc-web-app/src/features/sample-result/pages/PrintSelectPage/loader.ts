import { appStore } from 'src/infra/redux'
import {
  fetchPatientTypes,
  fetchPrintForms,
  fetchSampleOrigins,
  fetchSampleTypes,
  fetchTests,
} from 'src/infra/api'
import { authSlice } from 'src/features/auth'

export const printSelectPageLoader = async () => {
  const branchId = authSlice.selectors.selectActiveBranchId(
    appStore.getState(),
  )!
  const branch = authSlice.selectors.selectActiveBranch(
    appStore.getState(),
    branchId,
  )!

  const [
    patientTypeRes,
    testRes,
    sampleOriginRes,
    printFormRes,
    sampleTypeRes,
  ] = await Promise.all([
    appStore.dispatch(fetchPatientTypes(branchId)).unwrap(),
    appStore.dispatch(fetchTests(branchId)).unwrap(),
    appStore.dispatch(fetchSampleOrigins(branch.sampleOriginIds)).unwrap(),
    appStore.dispatch(fetchPrintForms(branchId)).unwrap(),
    appStore.dispatch(fetchSampleTypes(branchId)).unwrap(),
  ])

  const tests = testRes.items.toSorted((a, b) => {
    if (a.testCategory?.displayIndex === b.testCategory?.displayIndex) {
      return a.displayIndex - b.displayIndex
    }
    return a.testCategory?.displayIndex! - b.testCategory?.displayIndex!
  })

  const sampleOrigins = sampleOriginRes?.items ?? []
  const patientTypes = patientTypeRes?.items ?? []
  const printForms = printFormRes?.items ?? []
  const sampleTypes = sampleTypeRes?.items ?? []

  return {
    originMap: new Map(
      sampleOrigins.map((sampleOrigin) => [sampleOrigin._id, sampleOrigin]),
    ),
    patientTypeMap: new Map(
      patientTypes.map((patientType) => [patientType._id, patientType]),
    ),
    tests,
    testMap: new Map(tests.map((test) => [test._id, test])),
    printFormMap: new Map(
      printForms.map((printForm) => [printForm._id, printForm]),
    ),
    sampleTypeMap: new Map(
      sampleTypes.map((sampleType) => [sampleType._id, sampleType]),
    ),
  }
}
