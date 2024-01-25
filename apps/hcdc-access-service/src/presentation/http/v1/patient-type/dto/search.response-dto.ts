import { PaginatedResponse } from '@diut/nest-core'

import { PatientTypeResponseDto } from './response-dto'

export class PatientTypeSearchResponseDto extends PaginatedResponse(
  PatientTypeResponseDto,
) {}
