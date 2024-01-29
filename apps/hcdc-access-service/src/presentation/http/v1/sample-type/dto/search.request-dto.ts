import { SearchRequestDto } from '@diut/nestjs-core'

import { SampleType } from 'src/domain'

export class SampleTypeSearchRequestDto extends SearchRequestDto<SampleType> {}
