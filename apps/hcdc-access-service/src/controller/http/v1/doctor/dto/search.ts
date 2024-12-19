import { Doctor } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'
import { DoctorResponseDto } from './response-dto'

export class DoctorSearchRequestDto extends SearchRequestDto<Doctor> {}

export class DoctorSearchResponseDto extends PaginatedResponse(
  DoctorResponseDto,
) {}
