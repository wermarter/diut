import { LoaderFunctionArgs } from 'react-router-dom'

import { appStore } from 'src/core'
import { patientApi } from 'src/api/patient'
import { sampleApi } from 'src/api/sample'
import { userApi } from 'src/api/user'

export const editResultPageLoader = async ({ params }: LoaderFunctionArgs) => {
  const { sampleId, patientId } = params
  const [sample, patient] = await Promise.all([
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
  ])

  const author =
    (await appStore
      .dispatch(userApi.endpoints.userFindById.initiate({ id: sample.infoBy }))
      .unwrap()) ?? {}

  return {
    author,
    sample,
    patient,
  }
}
