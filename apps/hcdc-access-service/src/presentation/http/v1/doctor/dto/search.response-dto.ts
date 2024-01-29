import { PaginatedResponse } from '@diut/nestjs-core'

import { DoctorResponseDto } from './response-dto'

export class DoctorSearchResponseDto extends PaginatedResponse(
  DoctorResponseDto,
) {}
