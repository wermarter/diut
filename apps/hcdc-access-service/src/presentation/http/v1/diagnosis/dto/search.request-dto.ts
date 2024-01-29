import { SearchRequestDto } from '@diut/nestjs-core'

import { Diagnosis } from 'src/domain'

export class DiagnosisSearchRequestDto extends SearchRequestDto<Diagnosis> {}
