import { SearchRequestDto } from '@diut/server-core'
import { PatientType } from '../patient-type.schema'

export class SearchPatientTypeRequestDto extends SearchRequestDto<PatientType> {}
