import { LoaderFunctionArgs } from 'react-router-dom'

import { appStore } from 'src/infra/redux'
import { doctorApi } from 'src/infra/api/access-service/doctor'
import { indicationApi } from 'src/infra/api/access-service/indication'
import { patientApi } from 'src/infra/api/access-service/patient'
import { patientTypeApi } from 'src/infra/api/access-service/patient-type'
import { sampleApi } from 'src/infra/api/access-service/sample'
import { sampleTypeApi } from 'src/infra/api/access-service/sample-type'
import { userApi } from 'src/infra/api/access-service/user'
import { sampleOriginApi } from 'src/infra/api/access-service/sample-origin'

export const infoEditPageLoader = async ({ params }: LoaderFunctionArgs) => {
  const { sampleId, patientId } = params
  const [
    sampleInfo,
    patientInfo,
    patientTypes,
    indications,
    doctors,
    sampleTypes,
    sampleOrigins,
  ] = await Promise.all([
    appStore
      .dispatch(
        sampleApi.endpoints.sampleFindById.initiate({
          id: sampleId!,
        }),
      )
      .unwrap(),
    appStore
      .dispatch(
        patientApi.endpoints.patientFindById.initiate({
          id: patientId!,
        }),
      )
      .unwrap(),
    appStore
      .dispatch(
        patientTypeApi.endpoints.patientTypeSearch.initiate({
          searchPatientTypeRequestDto: { sort: { index: 1 } },
        }),
      )
      .unwrap(),
    appStore
      .dispatch(
        indicationApi.endpoints.indicationSearch.initiate({
          searchIndicationRequestDto: { sort: { index: 1 } },
        }),
      )
      .unwrap(),
    appStore
      .dispatch(
        doctorApi.endpoints.doctorSearch.initiate({
          searchDoctorRequestDto: { sort: { index: 1 } },
        }),
      )
      .unwrap(),
    appStore
      .dispatch(
        sampleTypeApi.endpoints.sampleTypeSearch.initiate({
          searchSampleTypeRequestDto: { sort: { index: 1 } },
        }),
      )
      .unwrap(),
    appStore
      .dispatch(
        sampleOriginApi.endpoints.sampleOriginSearch.initiate({
          searchSampleOriginRequestDto: { sort: { index: 1 } },
        }),
      )
      .unwrap(),
  ])

  const author =
    (await appStore
      .dispatch(
        userApi.endpoints.userFindById.initiate({ id: sampleInfo.infoBy }),
      )
      .unwrap()) ?? {}

  return {
    author,
    sampleInfo,
    patientInfo,
    patientTypes,
    indications,
    doctors,
    sampleTypes,
    sampleOrigins,
  }
}
