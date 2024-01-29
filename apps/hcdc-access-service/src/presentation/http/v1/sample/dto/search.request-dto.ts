import { SearchRequestDto } from '@diut/nestjs-core'

import { Sample } from 'src/domain'

export class SampleSearchRequestDto extends SearchRequestDto<Sample> {}
