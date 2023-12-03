import { PaginatedResponse } from '@diut/nest-core'
import { PatientResponseDto } from './patient.response-dto'

export class SearchPatientResponseDto extends PaginatedResponse(
  PatientResponseDto,
) {}
