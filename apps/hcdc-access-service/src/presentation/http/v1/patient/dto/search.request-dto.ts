import { SearchRequestDto } from '@diut/nestjs-infra'
import { Patient } from '@diut/hcdc'

export class PatientSearchRequestDto extends SearchRequestDto<Patient> {}
