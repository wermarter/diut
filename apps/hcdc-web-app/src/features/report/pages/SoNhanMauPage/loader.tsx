import { allTestReportSortComparator } from '@diut/hcdc'

import { appStore } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import {
  fetchPatientTypes,
  fetchSampleOrigins,
  fetchTests,
} from 'src/infra/api'

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
  const origins = sampleOriginRes?.items ?? []
  const patientTypes = patientTypeRes?.items ?? []

  return {
    patientTypes,
    origins,
    tests,
  }
}
