import { SearchRequestDto } from '@diut/nestjs-core'

import { PatientType } from 'src/domain'

export class PatientTypeSearchRequestDto extends SearchRequestDto<PatientType> {}
