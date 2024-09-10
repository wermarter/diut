export * from './loader'
import { useEffect } from 'react'
import { useLoaderData, useRevalidator } from 'react-router-dom'

import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'
import { InfoEditView } from '../../components'
import { InfoEditPageParams, infoEditPageLoader } from './loader'

export function urlInfoEditPage(
  params: InfoEditPageParams = {
    sampleId: ':sampleId',
  },
) {
  return `/info/edit/${params.sampleId}`
}

export function InfoEditPage() {
  const { patientTypes, diagnoses, doctors, sampleTypes, origins, sampleRes } =
    useLoaderData() as Awaited<ReturnType<typeof infoEditPageLoader>>
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const revalidator = useRevalidator()

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
      sampleRes={sampleRes}
    />
  )
}
