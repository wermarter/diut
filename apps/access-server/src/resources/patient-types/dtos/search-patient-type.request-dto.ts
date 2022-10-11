import { SearchRequestDto } from 'src/core/http-server/dtos/search-request'
import { PatientType } from '../patient-type.schema'

export class SearchPatientTypeRequestDto extends SearchRequestDto<PatientType> {}
