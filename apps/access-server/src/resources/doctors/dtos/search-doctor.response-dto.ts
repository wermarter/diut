import { PaginatedResponse } from 'src/core'
import { DoctorResponseDto } from './doctor.response-dto'

export class SearchDoctorResponseDto extends PaginatedResponse(
  DoctorResponseDto
) {}
