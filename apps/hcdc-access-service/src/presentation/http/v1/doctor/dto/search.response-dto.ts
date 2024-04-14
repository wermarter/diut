import { PaginatedResponse } from '@diut/nestjs-infra'

import { DoctorResponseDto } from './response-dto'

export class DoctorSearchResponseDto extends PaginatedResponse(
  DoctorResponseDto,
) {}
