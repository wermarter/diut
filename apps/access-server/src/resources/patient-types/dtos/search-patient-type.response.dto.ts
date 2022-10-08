import { PaginatedDto } from 'src/core'
import { PatientTypeResponseDto } from './patient-type.response.dto'

export class SearchPatientTypeResponseDto extends PaginatedDto(
  PatientTypeResponseDto
) {}
