import { SearchRequestDto } from '@diut/nestjs-infra'

import { Doctor } from 'src/domain'

export class DoctorSearchRequestDto extends SearchRequestDto<Doctor> {}
