import { SearchRequestDto } from '@diut/nestjs-infra'
import { Diagnosis } from '@diut/hcdc'

export class DiagnosisSearchRequestDto extends SearchRequestDto<Diagnosis> {}
