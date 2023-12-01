import { SearchRequestDto } from '@diut/nest-core'
import { Patient } from '../patient.schema'

export class SearchPatientRequestDto extends SearchRequestDto<Patient> {}
