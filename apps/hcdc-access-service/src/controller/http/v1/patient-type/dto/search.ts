import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { PatientType } from '@diut/hcdc'

import { PatientTypeResponseDto } from './response-dto'

export class PatientTypeSearchRequestDto extends SearchRequestDto<PatientType> {}

export class PatientTypeSearchResponseDto extends PaginatedResponse(
  PatientTypeResponseDto,
) {}
