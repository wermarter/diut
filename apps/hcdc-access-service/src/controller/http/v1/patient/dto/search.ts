import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { Patient } from '@diut/hcdc'

import { PatientResponseDto } from './response-dto'

export class PatientSearchRequestDto extends SearchRequestDto<Patient> {}

export class PatientSearchResponseDto extends PaginatedResponse(
  PatientResponseDto,
) {}
