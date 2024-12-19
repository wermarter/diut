import { Diagnosis } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'
import { DiagnosisResponseDto } from './response-dto'

export class DiagnosisSearchRequestDto extends SearchRequestDto<Diagnosis> {}

export class DiagnosisSearchResponseDto extends PaginatedResponse(
  DiagnosisResponseDto,
) {}
