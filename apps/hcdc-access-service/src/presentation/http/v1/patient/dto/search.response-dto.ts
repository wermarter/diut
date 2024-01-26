import { PaginatedResponse } from '@diut/nest-core'

import { PatientResponseDto } from './response-dto'

export class PatientSearchResponseDto extends PaginatedResponse(
  PatientResponseDto,
) {}
