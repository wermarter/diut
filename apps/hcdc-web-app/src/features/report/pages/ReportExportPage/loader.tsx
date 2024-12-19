import { allTestReportSortComparator } from '@diut/hcdc'
import { authSlice } from 'src/features/auth'
import {
  fetchPatientTypes,
  fetchSampleOrigins,
  fetchTestCombos,
  fetchTests,
} from 'src/infra/api'
import { appStore } from 'src/infra/redux'

export const reportExportPageLoader = async () => {
  const branchId = authSlice.selectors.selectActiveBranchId(
    appStore.getState(),
  )!
  const branch = authSlice.selectors.selectActiveBranch(
    appStore.getState(),
    branchId,
  )!

  const [testRes, testComboRes, patientTypeRes, originRes] = await Promise.all([
    appStore.dispatch(fetchTests(branchId)).unwrap(),
    appStore.dispatch(fetchTestCombos(branchId)).unwrap(),
    appStore.dispatch(fetchPatientTypes(branchId)).unwrap(),
    appStore.dispatch(fetchSampleOrigins(branch.sampleOriginIds)).unwrap(),
  ])

  return {
    tests: testRes.items.toSorted(allTestReportSortComparator),
    testCombos: testComboRes.items,
    patientTypes: patientTypeRes.items,
    origins: originRes.items,
  }
}
