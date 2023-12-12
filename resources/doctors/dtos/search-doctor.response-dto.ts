import { PaginatedResponse } from '@diut/nest-core'
import { DoctorResponseDto } from './doctor.response-dto'

export class SearchDoctorResponseDto extends PaginatedResponse(
  DoctorResponseDto,
) {}
