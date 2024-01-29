import { PaginatedResponse } from '@diut/nestjs-core'

import { DiagnosisResponseDto } from './response-dto'

export class DiagnosisSearchResponseDto extends PaginatedResponse(
  DiagnosisResponseDto,
) {}
