import { SearchRequestDto } from '@diut/nestjs-infra'
import { Doctor } from '@diut/hcdc'

export class DoctorSearchRequestDto extends SearchRequestDto<Doctor> {}
