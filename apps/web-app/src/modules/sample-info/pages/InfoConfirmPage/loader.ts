import { appStore } from 'src/core'
import { doctorApi } from 'src/api/doctor'
import { indicationApi } from 'src/api/indication'
import { patientTypeApi } from 'src/api/patient-type'
import { testApi } from 'src/api/test'

export const infoConfirmPageLoader = async () => {
  const [indicationRes, doctorRes, patientTypeRes, testRes] = await Promise.all(
    [
      appStore
        .dispatch(
          indicationApi.endpoints.indicationSearch.initiate({
            searchIndicationRequestDto: { sort: { index: 1 } },
          })
        )
        .unwrap(),
      appStore
        .dispatch(
          doctorApi.endpoints.doctorSearch.initiate({
            searchDoctorRequestDto: { sort: { index: 1 } },
          })
        )
        .unwrap(),
      appStore
        .dispatch(
          patientTypeApi.endpoints.patientTypeSearch.initiate({
            searchPatientTypeRequestDto: { sort: { index: 1 } },
          })
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
          })
        )
        .unwrap(),
    ]
  )

  const tests = testRes?.items ?? []
  const indications = indicationRes?.items ?? []
  const doctors = doctorRes?.items ?? []
  const patientTypes = patientTypeRes?.items ?? []

  return {
    indicationMap: new Map(
      indications.map((indication) => [indication._id, indication])
    ),
    doctorMap: new Map(doctors.map((doctor) => [doctor._id, doctor])),
    patientTypeMap: new Map(
      patientTypes.map((patientType) => [patientType._id, patientType])
    ),
    testMap: new Map(tests.map((test) => [test._id, test])),
  }
}
