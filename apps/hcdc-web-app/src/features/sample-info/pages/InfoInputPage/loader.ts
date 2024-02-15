import { appStore } from 'src/infra/redux'
import { doctorApi } from 'src/infra/api/doctor'
import { indicationApi } from 'src/infra/api/indication'
import { patientTypeApi } from 'src/infra/api/patient-type'
import { sampleTypeApi } from 'src/infra/api/sample-type'
import { sampleOriginApi } from 'src/infra/api/sample-origin'

export const infoInputPageLoader = async () => {
  const [patientTypes, indications, doctors, sampleTypes, sampleOrigins] =
    await Promise.all([
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

  return {
    patientTypes,
    indications,
    doctors,
    sampleTypes,
    sampleOrigins,
  }
}
