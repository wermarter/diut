import { PatientType } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'

import { PatientTypeResponseDto } from './response-dto'

export class PatientTypeSearchRequestDto extends SearchRequestDto<PatientType> {}

export class PatientTypeSearchResponseDto extends PaginatedResponse(
  PatientTypeResponseDto,
) {}
