import { SearchRequestDto } from '@diut/server-core'
import { Doctor } from '../doctor.schema'

export class SearchDoctorRequestDto extends SearchRequestDto<Doctor> {}
