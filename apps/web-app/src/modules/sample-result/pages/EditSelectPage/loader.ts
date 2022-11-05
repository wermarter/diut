import { appStore } from 'src/core'
import { doctorApi } from 'src/api/doctor'
import { indicationApi } from 'src/api/indication'

export const editSelectPageLoader = async () => {
  const [indications, doctors] = await Promise.all([
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
  ])

  return {
    indicationMap: new Map(
      indications.items.map((indication) => [indication._id, indication])
    ),
    doctorMap: new Map(doctors.items.map((doctor) => [doctor._id, doctor])),
  }
}
