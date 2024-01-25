import { SearchRequestDto } from '@diut/nest-core'

import { Diagnosis } from 'src/domain'

export class DiagnosisSearchRequestDto extends SearchRequestDto<Diagnosis> {}
