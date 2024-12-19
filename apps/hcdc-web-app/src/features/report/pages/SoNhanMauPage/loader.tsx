import { allTestReportSortComparator } from '@diut/hcdc'
import { authSlice } from 'src/features/auth'
import {
  fetchPatientTypes,
  fetchSampleOrigins,
  fetchTests,
} from 'src/infra/api'
import { appStore } from 'src/infra/redux'

export const soNhanMauPageLoader = async () => {
  const branchId = authSlice.selectors.selectActiveBranchId(
    appStore.getState(),
  )!
  const branch = authSlice.selectors.selectActiveBranch(
    appStore.getState(),
    branchId,
  )!

  const [patientTypeRes, testRes, sampleOriginRes] = await Promise.all([
    appStore.dispatch(fetchPatientTypes(branchId)).unwrap(),
    appStore.dispatch(fetchTests(branchId)).unwrap(),
    appStore.dispatch(fetchSampleOrigins(branch.sampleOriginIds)).unwrap(),
  ])

  const tests = testRes.items.toSorted(allTestReportSortComparator)
  const categoryMap = new Map<
    string,
    { name: string; reportIndex: number; _id: string }
  >()
  tests.forEach(({ testCategory, testCategoryId }) => {
    if (testCategory) {
      categoryMap.set(testCategory.name, {
        ...testCategory,
        _id: testCategoryId,
      })
    }
  })
  const categories = Array.from(categoryMap.values())
    .toSorted((a, b) => a.reportIndex - b.reportIndex)
    .map(({ _id, name }) => ({
      groupId: name,
      children: tests
        .filter(({ testCategoryId }) => _id === testCategoryId)
        .map(({ _id }) => ({ field: _id })),
    }))

  const origins = sampleOriginRes?.items ?? []
  const patientTypes = patientTypeRes?.items ?? []

  return {
    patientTypeMap: new Map(
      patientTypes.map((patientType) => [patientType._id, patientType]),
    ),
    origins,
    tests,
    categories,
  }
}
