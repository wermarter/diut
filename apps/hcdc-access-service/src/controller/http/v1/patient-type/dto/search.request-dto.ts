import { SearchRequestDto } from '@diut/nestjs-infra'
import { PatientType } from '@diut/hcdc'

export class PatientTypeSearchRequestDto extends SearchRequestDto<PatientType> {}
