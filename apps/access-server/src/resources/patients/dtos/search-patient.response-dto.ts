import { PaginatedResponse } from 'src/core'
import { PatientResponseDto } from './patient.response-dto'

export class SearchPatientResponseDto extends PaginatedResponse(
  PatientResponseDto
) {}
