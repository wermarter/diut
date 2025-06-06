export * from './loader'
import { useEffect } from 'react'
import { useLoaderData, useRevalidator } from 'react-router-dom'
import { authSlice } from 'src/features/auth'
import { useTypedSelector } from 'src/infra/redux'
import { InfoInputForm } from '../../components'
import { infoInputPageLoader } from './loader'

export function urlInfoInputPage() {
  return '/info'
}

export function InfoInputPage() {
  const { patientTypes, diagnoses, doctors, sampleTypes, origins } =
    useLoaderData() as Awaited<ReturnType<typeof infoInputPageLoader>>
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const revalidator = useRevalidator()

  useEffect(() => {
    revalidator.revalidate()
  }, [branchId])

  return (
    <InfoInputForm
      patientTypes={patientTypes}
      diagnoses={diagnoses}
      doctors={doctors}
      sampleTypes={sampleTypes}
      origins={origins}
    />
  )
}
