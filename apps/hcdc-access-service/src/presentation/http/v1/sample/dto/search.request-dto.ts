import { SearchRequestDto } from '@diut/nest-core'

import { Sample } from 'src/domain'

export class SampleSearchRequestDto extends SearchRequestDto<Sample> {}
