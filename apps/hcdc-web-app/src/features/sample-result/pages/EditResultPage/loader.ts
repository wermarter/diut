import { LoaderFunctionArgs } from 'react-router-dom'

import { appStore } from 'src/infra/redux'
import { patientApi } from 'src/infra/api/patient'
import { sampleApi } from 'src/infra/api/sample'
import { userApi } from 'src/infra/api/user'

export const editResultPageLoader = async ({ params }: LoaderFunctionArgs) => {
  const { sampleId, patientId } = params
  const [sample, patient] = await Promise.all([
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
