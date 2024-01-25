import { SearchRequestDto } from '@diut/nest-core'

import { Doctor } from 'src/domain'

export class DoctorSearchRequestDto extends SearchRequestDto<Doctor> {}
