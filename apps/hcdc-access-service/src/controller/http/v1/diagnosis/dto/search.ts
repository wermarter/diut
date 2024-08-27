import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { Diagnosis } from '@diut/hcdc'

import { DiagnosisResponseDto } from './response-dto'

export class DiagnosisSearchRequestDto extends SearchRequestDto<Diagnosis> {}

export class DiagnosisSearchResponseDto extends PaginatedResponse(
  DiagnosisResponseDto,
) {}
