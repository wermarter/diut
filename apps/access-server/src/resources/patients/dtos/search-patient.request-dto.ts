import { SearchRequestDto } from 'src/core/http-server/dtos/search-request'
import { Patient } from '../patient.schema'

export class SearchPatientRequestDto extends SearchRequestDto<Patient> {}
