import { useEffect } from 'react'
import { useLoaderData, useRevalidator } from 'react-router-dom'

import { infoConfirmPageLoader } from './loader'
import { InfoConfirmView } from '../../components'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'

export default function InfoConfirmPage() {
  const { diagnosisMap, doctorMap, patientTypeMap, testMap, sampleOriginMap } =
    useLoaderData() as Awaited<ReturnType<typeof infoConfirmPageLoader>>
  const branchId = useTypedSelector(authSlice.selectors.selectActiveBranchId)!
  const revalidator = useRevalidator()

  useEffect(() => {
    revalidator.revalidate()
  }, [branchId])

  return (
    <InfoConfirmView
      diagnosisMap={diagnosisMap}
      doctorMap={doctorMap}
      patientTypeMap={patientTypeMap}
      testMap={testMap}
      sampleOriginMap={sampleOriginMap}
    />
  )
}
