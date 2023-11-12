import { SearchRequestDto } from '@diut/server-core'
import { Patient } from '../patient.schema'

export class SearchPatientRequestDto extends SearchRequestDto<Patient> {}
