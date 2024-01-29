import { SearchRequestDto } from '@diut/nestjs-core'

import { Patient } from 'src/domain'

export class PatientSearchRequestDto extends SearchRequestDto<Patient> {}
