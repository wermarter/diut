import { SearchRequestDto } from '@diut/nestjs-infra'

import { Diagnosis } from 'src/domain'

export class DiagnosisSearchRequestDto extends SearchRequestDto<Diagnosis> {}
