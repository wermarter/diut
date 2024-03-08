import { useEffect } from 'react'
import { useLoaderData, useParams, useRevalidator } from 'react-router-dom'

import { InfoEditPageParams, infoEditPageLoader } from './loader'
import { InfoEditView } from '../../components'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'

export function urlInfoEditPage(params: InfoEditPageParams) {
  return `/info/edit/${params.patientId}/${params.sampleId}`
}

export default function InfoEditPage() {
  const {
    patientTypes,
    diagnoses,
    doctors,
    sampleTypes,
    origins,
    patientRes,
    sampleRes,
  } = useLoaderData() as Awaited<ReturnType<typeof infoEditPageLoader>>
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const revalidator = useRevalidator()
  const { sampleId, patientId } = useParams<InfoEditPageParams>()

  useEffect(() => {
    revalidator.revalidate()
  }, [branchId])

  return (
    <InfoEditView
      patientTypes={patientTypes}
      diagnoses={diagnoses}
      doctors={doctors}
      sampleTypes={sampleTypes}
      origins={origins}
      patientRes={patientRes}
      sampleRes={sampleRes}
      sampleId={sampleId!}
      patientId={patientId!}
    />
  )
}
