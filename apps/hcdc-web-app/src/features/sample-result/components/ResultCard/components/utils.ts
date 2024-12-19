import { PatientCategory } from '@diut/hcdc'
import {
  SampleResultTestElementResponseDto,
  SampleResultTestResponseDto,
} from 'src/infra/api/access-service/sample'

export type CardContentCommonProps = {
  sampleId: string
  isDisabled: boolean
  resultState: Record<string, TestElementResultData>
  resultRes: SampleResultTestResponseDto
  patientCategory: PatientCategory
  setResultState: (
    testElementId: string,
    data: Partial<TestElementResultData>,
  ) => void
}

export type TestElementResultData = Pick<
  SampleResultTestElementResponseDto,
  'isAbnormal' | 'value'
>
