import { PaginatedResponse } from '@diut/server-core'
import { DoctorResponseDto } from './doctor.response-dto'

export class SearchDoctorResponseDto extends PaginatedResponse(
  DoctorResponseDto,
) {}
