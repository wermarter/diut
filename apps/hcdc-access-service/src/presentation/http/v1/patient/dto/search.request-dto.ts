import { SearchRequestDto } from '@diut/nest-core'

import { Patient } from 'src/domain'

export class PatientSearchRequestDto extends SearchRequestDto<Patient> {}
