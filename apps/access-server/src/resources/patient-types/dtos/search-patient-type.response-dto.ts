import { PaginatedResponse } from '@diut/server-core'
import { PatientTypeResponseDto } from './patient-type.response-dto'

export class SearchPatientTypeResponseDto extends PaginatedResponse(
  PatientTypeResponseDto,
) {}
