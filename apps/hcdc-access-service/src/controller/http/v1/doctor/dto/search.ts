import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { Doctor } from '@diut/hcdc'

import { DoctorResponseDto } from './response-dto'

export class DoctorSearchRequestDto extends SearchRequestDto<Doctor> {}

export class DoctorSearchResponseDto extends PaginatedResponse(
  DoctorResponseDto,
) {}
