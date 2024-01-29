import { PaginatedResponse } from '@diut/nestjs-core'

import { PatientResponseDto } from './response-dto'

export class PatientSearchResponseDto extends PaginatedResponse(
  PatientResponseDto,
) {}
