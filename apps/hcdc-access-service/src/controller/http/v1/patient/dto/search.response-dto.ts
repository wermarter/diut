import { PaginatedResponse } from '@diut/nestjs-infra'

import { PatientResponseDto } from './response-dto'

export class PatientSearchResponseDto extends PaginatedResponse(
  PatientResponseDto,
) {}
