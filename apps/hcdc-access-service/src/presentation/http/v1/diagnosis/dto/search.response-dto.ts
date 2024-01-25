import { PaginatedResponse } from '@diut/nest-core'

import { DiagnosisResponseDto } from './response-dto'

export class DiagnosisSearchResponseDto extends PaginatedResponse(
  DiagnosisResponseDto,
) {}
