import { PaginatedResponse } from '@diut/nest-core'

import { DoctorResponseDto } from './response-dto'

export class DoctorSearchResponseDto extends PaginatedResponse(
  DoctorResponseDto,
) {}
