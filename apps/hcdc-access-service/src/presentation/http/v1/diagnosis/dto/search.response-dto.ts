import { PaginatedResponse } from '@diut/nestjs-infra'

import { DiagnosisResponseDto } from './response-dto'

export class DiagnosisSearchResponseDto extends PaginatedResponse(
  DiagnosisResponseDto,
) {}
