import { SearchRequestDto } from '@diut/nestjs-core'

import { Doctor } from 'src/domain'

export class DoctorSearchRequestDto extends SearchRequestDto<Doctor> {}
