import { PaginatedResponse } from '@diut/nest-core'
import { PatientTypeResponseDto } from './patient-type.response-dto'

export class SearchPatientTypeResponseDto extends PaginatedResponse(
  PatientTypeResponseDto,
) {}
