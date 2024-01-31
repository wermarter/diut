import { SearchRequestDto } from '@diut/nestjs-infra'

import { PatientType } from 'src/domain'

export class PatientTypeSearchRequestDto extends SearchRequestDto<PatientType> {}
