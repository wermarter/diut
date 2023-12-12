import { SearchRequestDto } from '@diut/nest-core'
import { Doctor } from '../doctor.schema'

export class SearchDoctorRequestDto extends SearchRequestDto<Doctor> {}
