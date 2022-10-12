import { SearchRequestDto } from 'src/core/http-server/dtos/search-request'
import { Doctor } from '../doctor.schema'

export class SearchDoctorRequestDto extends SearchRequestDto<Doctor> {}
