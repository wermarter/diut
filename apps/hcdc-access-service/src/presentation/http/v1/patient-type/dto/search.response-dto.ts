import { PaginatedResponse } from '@diut/nestjs-infra'

import { PatientTypeResponseDto } from './response-dto'

export class PatientTypeSearchResponseDto extends PaginatedResponse(
  PatientTypeResponseDto,
) {}
