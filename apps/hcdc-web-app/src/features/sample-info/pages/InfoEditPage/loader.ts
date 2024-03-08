import { LoaderFunctionArgs } from 'react-router-dom'

import { appStore } from 'src/infra/redux'
import { patientApi } from 'src/infra/api/access-service/patient'
import { sampleApi } from 'src/infra/api/access-service/sample'
import {
  fetchDiagnoses,
  fetchDoctors,
  fetchPatientTypes,
  fetchSampleOrigins,
  fetchSampleTypes,
} from 'src/infra/api'

export type InfoEditPageParams = {
  sampleId: string
  patientId: string
}

export const infoEditPageLoader = async ({ params }: LoaderFunctionArgs) => {
  const { sampleId, patientId } = params as InfoEditPageParams
  const sampleRes = await appStore
    .dispatch(sampleApi.endpoints.sampleFindById.initiate(sampleId!))
    .unwrap()

  const [
    patientRes,
    patientTypeRes,
    diagnosisRes,
    doctorRes,
    sampleTypeRes,
    originRes,
  ] = await Promise.all([
    appStore
      .dispatch(patientApi.endpoints.patientFindById.initiate(patientId!))
      .unwrap(),
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
    patientRes,
    patientTypes: patientTypeRes.items,
    diagnoses: diagnosisRes.items,
    doctors: doctorRes.items,
    sampleTypes: sampleTypeRes.items,
    origins: originRes.items,
  }
}
