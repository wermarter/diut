import { SearchRequestDto } from '@diut/nest-core'

import { PatientType } from 'src/domain'

export class PatientTypeSearchRequestDto extends SearchRequestDto<PatientType> {}
