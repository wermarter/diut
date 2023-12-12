import { SearchRequestDto } from '@diut/nest-core'
import { PatientType } from '../patient-type.schema'

export class SearchPatientTypeRequestDto extends SearchRequestDto<PatientType> {}
