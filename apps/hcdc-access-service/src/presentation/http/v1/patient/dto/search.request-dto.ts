import { SearchRequestDto } from '@diut/nestjs-infra'

import { Patient } from 'src/domain'

export class PatientSearchRequestDto extends SearchRequestDto<Patient> {}
