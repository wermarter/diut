import { appStore } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import {
  fetchDiagnoses,
  fetchDoctors,
  fetchPatientTypes,
  fetchSampleOrigins,
  fetchSampleTypes,
} from 'src/infra/api'

export const infoInputPageLoader = async () => {
  const branchId = authSlice.selectors.selectActiveBranchId(
    appStore.getState(),
  )!
  const branch = authSlice.selectors.selectActiveBranch(
    appStore.getState(),
    branchId,
  )!

  const [patientTypeRes, diagnosisRes, doctorRes, sampleTypeRes, originRes] =
    await Promise.all([
      appStore.dispatch(fetchPatientTypes(branchId)).unwrap(),
      appStore.dispatch(fetchDiagnoses(branchId)).unwrap(),
      appStore.dispatch(fetchDoctors(branchId)).unwrap(),
      appStore.dispatch(fetchSampleTypes(branchId)).unwrap(),
      appStore.dispatch(fetchSampleOrigins(branch.sampleOriginIds)).unwrap(),
    ])

  return {
    patientTypes: patientTypeRes.items,
    diagnoses: diagnosisRes.items,
    doctors: doctorRes.items,
    sampleTypes: sampleTypeRes.items,
    origins: originRes.items,
  }
}
