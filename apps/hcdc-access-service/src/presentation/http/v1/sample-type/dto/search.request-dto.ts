import { SearchRequestDto } from '@diut/nestjs-infra'

import { SampleType } from 'src/domain'

export class SampleTypeSearchRequestDto extends SearchRequestDto<SampleType> {}
