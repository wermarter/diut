import { LoaderFunctionArgs } from 'react-router-dom'

import {
  fetchDiagnoses,
  fetchDoctors,
  fetchPatientTypes,
  fetchSampleOrigins,
  fetchSampleTypes,
} from 'src/infra/api'
import { sampleApi } from 'src/infra/api/access-service/sample'
import { appStore } from 'src/infra/redux'

export type InfoEditPageParams = {
  sampleId: string
}

export const infoEditPageLoader = async ({ params }: LoaderFunctionArgs) => {
  const { sampleId } = params as InfoEditPageParams
  const sampleRes = await appStore
    .dispatch(sampleApi.endpoints.sampleFindInfoById.initiate(sampleId))
    .unwrap()

  const [patientTypeRes, diagnosisRes, doctorRes, sampleTypeRes, originRes] =
    await Promise.all([
      appStore.dispatch(fetchPatientTypes(sampleRes.branchId)).unwrap(),
      appStore.dispatch(fetchDiagnoses(sampleRes.branchId)).unwrap(),
      appStore.dispatch(fetchDoctors(sampleRes.branchId)).unwrap(),
      appStore.dispatch(fetchSampleTypes(sampleRes.branchId)).unwrap(),
      appStore
        .dispatch(fetchSampleOrigins(sampleRes.branch?.sampleOriginIds!))
        .unwrap(),
    ])

  return {
    sampleRes,
    patientTypes: patientTypeRes.items,
    diagnoses: diagnosisRes.items,
    doctors: doctorRes.items,
    sampleTypes: sampleTypeRes.items,
    origins: originRes.items,
  }
}
