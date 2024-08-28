import { authSlice } from 'src/features/auth'
import {
  fetchDiagnoses,
  fetchDoctors,
  fetchPatientTypes,
  fetchSampleOrigins,
  fetchTests,
} from 'src/infra/api'
import { appStore } from 'src/infra/redux'

export const resultSelectPageLoader = async () => {
  const branchId = authSlice.selectors.selectActiveBranchId(
    appStore.getState(),
  )!
  const branch = authSlice.selectors.selectActiveBranch(
    appStore.getState(),
    branchId,
  )!

  const [diagnosisRes, doctorRes, patientTypeRes, testRes, sampleOriginRes] =
    await Promise.all([
      appStore.dispatch(fetchDiagnoses(branchId)).unwrap(),
      appStore.dispatch(fetchDoctors(branchId)).unwrap(),
      appStore.dispatch(fetchPatientTypes(branchId)).unwrap(),
      appStore.dispatch(fetchTests(branchId)).unwrap(),
      appStore.dispatch(fetchSampleOrigins(branch.sampleOriginIds)).unwrap(),
    ])

  const tests = testRes?.items ?? []
  const diagnoses = diagnosisRes?.items ?? []
  const sampleOrigins = sampleOriginRes?.items ?? []
  const doctors = doctorRes?.items ?? []
  const patientTypes = patientTypeRes?.items ?? []

  return {
    diagnosisMap: new Map(
      diagnoses.map((diagnosis) => [diagnosis._id, diagnosis]),
    ),
    originMap: new Map(
      sampleOrigins.map((sampleOrigin) => [sampleOrigin._id, sampleOrigin]),
    ),
    doctorMap: new Map(doctors.map((doctor) => [doctor._id, doctor])),
    patientTypeMap: new Map(
      patientTypes.map((patientType) => [patientType._id, patientType]),
    ),
    testMap: new Map(tests.map((test) => [test._id, test])),
  }
}
