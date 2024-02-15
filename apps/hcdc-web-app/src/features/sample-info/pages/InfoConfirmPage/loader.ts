import { appStore } from 'src/infra/redux'
import { doctorApi } from 'src/infra/api/doctor'
import { indicationApi } from 'src/infra/api/indication'
import { patientTypeApi } from 'src/infra/api/patient-type'
import { testApi } from 'src/infra/api/test'
import { sampleOriginApi } from 'src/infra/api/sample-origin'

export const infoConfirmPageLoader = async () => {
  const [indicationRes, doctorRes, patientTypeRes, testRes, sampleOriginRes] =
    await Promise.all([
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
          patientTypeApi.endpoints.patientTypeSearch.initiate({
            searchPatientTypeRequestDto: { sort: { index: 1 } },
          }),
        )
        .unwrap(),
      appStore
        .dispatch(
          testApi.endpoints.testSearch.initiate({
            searchTestRequestDto: {
              sort: {
                category: 1,
              },
            },
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

  const tests = testRes?.items ?? []
  const indications = indicationRes?.items ?? []
  const sampleOrigins = sampleOriginRes?.items ?? []
  const doctors = doctorRes?.items ?? []
  const patientTypes = patientTypeRes?.items ?? []

  return {
    indicationMap: new Map(
      indications.map((indication) => [indication._id, indication]),
    ),
    sampleOriginMap: new Map(
      sampleOrigins.map((sampleOrigin) => [sampleOrigin._id, sampleOrigin]),
    ),
    doctorMap: new Map(doctors.map((doctor) => [doctor._id, doctor])),
    patientTypeMap: new Map(
      patientTypes.map((patientType) => [patientType._id, patientType]),
    ),
    testMap: new Map(tests.map((test) => [test._id, test])),
  }
}
