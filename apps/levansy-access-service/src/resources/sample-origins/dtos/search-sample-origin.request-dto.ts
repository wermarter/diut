import { SearchRequestDto } from '@diut/nest-core'

import { SampleOrigin } from '../sample-origin.schema'

export class SearchSampleOriginRequestDto extends SearchRequestDto<SampleOrigin> {}
