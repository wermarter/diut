import { PaginatedResponse } from '@diut/nestjs-core'

import { PatientTypeResponseDto } from './response-dto'

export class PatientTypeSearchResponseDto extends PaginatedResponse(
  PatientTypeResponseDto,
) {}
