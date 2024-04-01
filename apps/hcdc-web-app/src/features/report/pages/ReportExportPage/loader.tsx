import { appStore } from 'src/infra/redux'
import { fetchPatientTypes, fetchTestCombos, fetchTests } from 'src/infra/api'
import { authSlice } from 'src/features/auth'

export const reportExportPageLoader = async () => {
  const branchId = authSlice.selectors.selectActiveBranchId(
    appStore.getState(),
  )!

  const [testRes, testComboRes, patientTypeRes] = await Promise.all([
    appStore.dispatch(fetchTests(branchId)).unwrap(),
    appStore.dispatch(fetchTestCombos(branchId)).unwrap(),
    appStore.dispatch(fetchPatientTypes(branchId)).unwrap(),
  ])

  return {
    tests: testRes.items,
    testCombos: testComboRes.items,
    patientTypes: patientTypeRes.items,
  }
}
