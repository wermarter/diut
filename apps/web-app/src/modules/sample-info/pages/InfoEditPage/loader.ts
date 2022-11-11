import { LoaderFunctionArgs } from 'react-router-dom'

import { appStore } from 'src/core'
import { doctorApi } from 'src/api/doctor'
import { indicationApi } from 'src/api/indication'
import { patientApi } from 'src/api/patient'
import { patientTypeApi } from 'src/api/patient-type'
import { sampleApi } from 'src/api/sample'
import { sampleTypeApi } from 'src/api/sample-type'
import { userApi } from 'src/api/user'

export const infoEditPageLoader = async ({ params }: LoaderFunctionArgs) => {
  const { sampleId, patientId } = params
  const [
    sampleInfo,
    patientInfo,
    patientTypes,
    indications,
    doctors,
    sampleTypes,
  ] = await Promise.all([
    appStore
      .dispatch(
        sampleApi.endpoints.sampleFindById.initiate({
          id: sampleId!,
        })
      )
      .unwrap(),
    appStore
      .dispatch(
        patientApi.endpoints.patientFindById.initiate({
          id: patientId!,
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
        sampleTypeApi.endpoints.sampleTypeSearch.initiate({
          searchSampleTypeRequestDto: { sort: { index: 1 } },
        })
      )
      .unwrap(),
  ])

  const author = await appStore
    .dispatch(
      userApi.endpoints.userFindById.initiate({ id: sampleInfo.infoBy })
    )
    .unwrap()

  return {
    author,
    sampleInfo,
    patientInfo,
    patientTypes,
    indications,
    doctors,
    sampleTypes,
  }
}
