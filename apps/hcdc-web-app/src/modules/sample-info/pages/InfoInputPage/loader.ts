import { appStore } from 'src/core'
import { doctorApi } from 'src/api/doctor'
import { indicationApi } from 'src/api/indication'
import { patientTypeApi } from 'src/api/patient-type'
import { sampleTypeApi } from 'src/api/sample-type'
import { sampleOriginApi } from 'src/api/sample-origin'

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
