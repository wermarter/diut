import { PatientCategory } from '@diut/hcdc'

import {
  SampleResultTestElementResponseDto,
  SampleResultTestResponseDto,
} from 'src/infra/api/access-service/sample'

export type CardContentProps = {
  isDisabled: boolean
  result: Record<string, TestElementResultData>
  testResult: SampleResultTestResponseDto
  patientCategory: PatientCategory
  setElementResult: (testElementId: string, data: TestElementResultData) => void
}

export type TestElementResultData = Pick<
  SampleResultTestElementResponseDto,
  'isAbnormal' | 'value'
>
