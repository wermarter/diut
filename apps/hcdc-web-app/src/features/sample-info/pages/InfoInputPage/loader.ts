import { appStore } from 'src/infra/redux'
import { doctorApi } from 'src/infra/api/access-service/doctor'
import { patientTypeApi } from 'src/infra/api/access-service/patient-type'
import { sampleTypeApi } from 'src/infra/api/access-service/sample-type'
import { diagnosisApi } from 'src/infra/api/access-service/diagnosis'
import { branchApi } from 'src/infra/api/access-service/branch'
import { authSlice } from 'src/features/auth'

export const infoInputPageLoader = async () => {
  const branchId = authSlice.selectors.selectActiveBranchId(appStore.getState())
  const branch = authSlice.selectors.selectActiveBranch(
    appStore.getState(),
    branchId,
  )!

  const [patientTypeRes, diagnosisRes, doctorRes, sampleTypeRes, branchRes] =
    await Promise.all([
      appStore
        .dispatch(
          patientTypeApi.endpoints.patientTypeSearch.initiate({
            sort: { displayIndex: 1 },
            filter: { branchId },
          }),
        )
        .unwrap(),
      appStore
        .dispatch(
          diagnosisApi.endpoints.diagnosisSearch.initiate({
            sort: { displayIndex: 1 },
            filter: { branchId },
          }),
        )
        .unwrap(),
      appStore
        .dispatch(
          doctorApi.endpoints.doctorSearch.initiate({
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
      appStore
        .dispatch(
          branchApi.endpoints.branchSearch.initiate({
            sort: { displayIndex: 1 },
            filter: {
              _id: { $in: branch.sampleOriginIds },
            },
          }),
        )
        .unwrap(),
    ])

  return {
    patientTypes: patientTypeRes.items,
    diagnoses: diagnosisRes.items,
    doctors: doctorRes.items,
    sampleTypes: sampleTypeRes.items,
    origins: branchRes.items,
  }
}
