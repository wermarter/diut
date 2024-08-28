import { Patient } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'

import { PatientResponseDto } from './response-dto'

export class PatientSearchRequestDto extends SearchRequestDto<Patient> {}

export class PatientSearchResponseDto extends PaginatedResponse(
  PatientResponseDto,
) {}
