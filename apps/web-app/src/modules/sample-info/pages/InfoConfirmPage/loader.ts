import { appStore } from 'src/core'
import { doctorApi } from 'src/api/doctor'
import { indicationApi } from 'src/api/indication'
import { patientTypeApi } from 'src/api/patient-type'

export const infoConfirmPageLoader = async () => {
  const [indications, doctors, patientTypes] = await Promise.all([
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
  ])

  return {
    indicationMap: new Map(
      indications.items.map((indication) => [indication._id, indication])
    ),
    doctorMap: new Map(doctors.items.map((doctor) => [doctor._id, doctor])),
    patientTypeMap: new Map(
      patientTypes.items.map((patientType) => [patientType._id, patientType])
    ),
  }
}
