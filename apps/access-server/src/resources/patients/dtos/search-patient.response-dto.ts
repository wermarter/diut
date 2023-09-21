import { PaginatedResponse } from '@diut/server-core'
import { PatientResponseDto } from './patient.response-dto'

export class SearchPatientResponseDto extends PaginatedResponse(
  PatientResponseDto,
) {}
